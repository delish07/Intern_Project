const Transactions = require("../models/transactions")

 const Transaction = (id,timestamp,type) =>{
    const transaction = new Transactions({
        item_id : id,
        type : type,
        quantity : 1,
        timestamp : timestamp
    })
    transaction.save().then()
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = Transaction;