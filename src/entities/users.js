const uuid = require('uuid');
class users{
    constructor(document, id, last_name, name, r_name){
        this.document = document;
        if(id !== null){
            this.id = id;
        } else {
            this.id = uuid.v4();
        }
        this.last_name = last_name;
        this.name = name;
        this.r_name = r_name;
    }

}

module.exports = users;