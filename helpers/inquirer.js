const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.brightGreen} Create Task`
      },
      {
        value: '2',
        name: `${'2.'.brightGreen} List tasks`
      },
      {
        value: '3',
        name: `${'3.'.brightGreen} List completed tasks`
      },
      {
        value: '4',
        name: `${'4.'.brightGreen} List pending tasks`
      },
      {
        value: '5',
        name: `${'5.'.brightGreen} Update task(s)`
      },
      {
        value: '6',
        name: `${'6.'.brightGreen} Delete task(s)`
      },
      {
        value: '0',
        name: `${'0.'.brightGreen} Exit`
      },
    ]
  }
];

const inquirerMenu = async () => {

  console.clear();
  console.log('============================'.brightYellow);
  console.log('     Select an option'.brightGreen);
  console.log('============================\n'.brightYellow);

  const { option } = await inquirer.prompt(questions);
  return option;
}

const pause = async () => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.brightGreen} to continue`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question);

}

const readInput = async ( message ) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if( value.length === 0 ) return 'Please put a value';
        return true;
      } 
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listDeleteTasks = async ( tasks = [] ) => {

  const choices = tasks.map(( task, i ) => {
    
    const idx = `${i + 1}.`.brightGreen;
 
    return {
      value: task.id,
      name: `${idx} ${task.desc}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0. '.brightGreen + 'Go back'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ];

  const { id } = await inquirer.prompt( questions );
  return id;
}

const confirm = async ( message ) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showChecklist = async ( tasks = [] ) => {

  const choices = tasks.map(( task, i ) => {
    
    const idx = `${i + 1}.`.brightGreen;
 
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: ( task.completedIn ) ? true : false
    }
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ];

  const { ids } = await inquirer.prompt( questions );
  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTasks,
  confirm,
  showChecklist
} 