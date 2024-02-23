const uuid = require('uuid');
class sales{
    constructor(id, prod_id, qty, user_id, total, date){
        if(id !== null){
            this.id = id;
        }else{
            this.id = uuid.v4();
        }
        this.prod_id = prod_id;
        if(date !== null){
            this.date = date;
        }else{
            var NDate = new Date();
            this.date = NDate.toISOString();
        }
        
        this.qty = qty;
        this.user_id = user_id; 
        this.total = total;

    }

}

module.exports = sales;