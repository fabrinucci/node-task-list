const { v4: uuid } = require('uuid');

class Task {
  id = '';
  desc = '';
  completedIn = null;

  constructor( desc ) {
    this.id = uuid();
    this.desc = desc;
  }

}

module.exports = Task;