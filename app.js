require('colors');

const { inquirerMenu,
  pause,
  readInput, 
  listDeleteTasks,
  confirm,
  showChecklist
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {

  let option = '';
  const tasks = new Tasks();
  const tasksDB = readDB();

  if( tasksDB ) {
    tasks.loadTasksFromArray( tasksDB );
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case '1':
        const desc = await readInput('Description:');
        tasks.createTask(desc);
      break;

      case '2':
        tasks.fullList();
      break;

      case '3':
        tasks.listCompletedTasks(true);
      break;

      case '4':
        tasks.listCompletedTasks(false);
      break;

      case '5':
        const ids = await showChecklist(tasks.listArr);
        tasks.toggleCompleted( ids );  
      break;


      case '6':
        const id = await listDeleteTasks(tasks.listArr);

        if( id !== '0' ) {
          const ok = await confirm('Are you sure?');
  
          if( ok ) {
            tasks.deleteTask(id);
            console.log('Task successfully deleted'.brightGreen);
          }
        }
      break;
    }

    saveDB( tasks.listArr );

    ( option !== '0' ) && await pause();

  } while ( option !== '0' );

}

main();