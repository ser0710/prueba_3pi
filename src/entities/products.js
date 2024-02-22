const uuid = require('uuid');
class products{
    constructor(des, name, price){
        this.id = uuid.v4();
        this.des = des;
        this.name = name;
        this.price = price;
    }

}

module.exports = products;