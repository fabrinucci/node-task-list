require('colors');

const showMenu = () => {

  return new Promise( resolve => {

    console.clear();
    console.log('============================'.brightYellow);
    console.log('     Select an option'.brightGreen);
    console.log('============================\n'.brightYellow);
  
    console.log(`${'1'.brightGreen}${'.'.brightYellow} Create task`);
    console.log(`${'2'.brightGreen}${'.'.brightYellow} List tasks`);
    console.log(`${'3'.brightGreen}${'.'.brightYellow} List completed tasks`);
    console.log(`${'4'.brightGreen}${'.'.brightYellow} List pending tasks`);
    console.log(`${'5'.brightGreen}${'.'.brightYellow} Complete task(s)`);
    console.log(`${'6'.brightGreen}${'.'.brightYellow} Delete task`);
    console.log(`${'0'.brightGreen}${'.'.brightYellow} Exit\n`);
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    readline.question('Select an option: ', option => {
      readline.close();
      resolve(option);
    })
  })

}


const pause = () => {

  return new Promise( resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    readline.question(`\nPress ${'ENTER'.brightGreen} to continue\n`, () => {
      readline.close();
      resolve();
    })
  })

}

module.exports = {
  showMenu,
  pause
}