const uuid = require('uuid');
class roles{
    constructor(id, name){
        if(id !== null){
            this.id = id;
        } else {
            this.id = uuid.v4();
        }
        this.name = name;
    }

}

module.exports = roles;