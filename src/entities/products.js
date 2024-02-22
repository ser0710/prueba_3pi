const uuid = require('uuid');
class products{
    constructor(id, des, name, price){
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

module.exports = products;