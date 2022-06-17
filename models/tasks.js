require('colors');

const Task = require('./task');

class Tasks {

  _list = {};

  get listArr() {

    const list = [];
    
    Object.keys(this._list).forEach( key => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask( id = '' ) {

    if( this._list[id] ) delete( this._list[id] )

  }

  loadTasksFromArray( tasks = [] ) {

    tasks.forEach( task => {
      this._list[ task.id ] = task;
    })
  }

  createTask( desc = '' ) {
    const task = new Task( desc );
    this._list[task.id] = task;
  }

  fullList() {
    
    console.log();
    this.listArr.forEach(( task, i ) => {

      const idx = `${i + 1}.`.brightGreen;
      const { desc, completedIn } = task;

      const state = ( completedIn ) 
        ? 'Completed'.brightGreen 
        : 'Pending'.brightRed

      console.log(`${idx} ${desc} ${'::'.brightYellow} ${state}`);

    });
  }

  listCompletedTasks( completed = true ) {

    console.log();    
    let counter = 0;
    this.listArr.forEach(( task ) => {

      const { desc, completedIn } = task;

      const state = ( completedIn ) 
        ? 'Completed'.brightGreen 
        : 'Pending'.brightRed

      if( completed ) {
        if( completedIn ) {
          counter += 1;
          console.log(`${(counter + '.').brightGreen} ${desc} ${'::'.brightYellow} ${completedIn.brightGreen}`);
        }
      } else {
        if( !completedIn ) {
          counter += 1;
          console.log(`${(counter + '.').brightGreen} ${desc} ${'::'.brightYellow} ${state}`);
        }
      }
    })
  }

  toggleCompleted( ids = [] ) {
    
    ids.forEach( id => {

      const task = this._list[id];
      if( !task.completedIn ) {
        task.completedIn = new Date().toISOString()
      }
    });

    this.listArr.forEach( task => {
      
      if( !ids.includes(task.id) ) {
        this._list[task.id].completedIn = null;
      }
    })
  }
  
}

module.exports = Tasks;