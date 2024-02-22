const uuid = require('uuid');
class users{
    constructor(document, id, last_name, name, roles_id){
        if(id !== null){
            this.id = id;
        } else {
            this.id = uuid.v4();
        }
        this.des = des;
        this.name = name;
        this.price = price;
    }

}

module.exports = users;