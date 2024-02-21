const Transactions = require("../models/transactions")

 const postTransaction = (item,timestamp) =>{
    const transaction = new Transactions({
        item_id : item._id,
        type : "IN",
        quantity : 1,
        timestamp : timestamp
    })
    transaction.save().then()
    .catch((err)=>{
        res.status(400).send();
    })
}

module.exports = postTransaction;