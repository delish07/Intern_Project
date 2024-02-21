const Transactions = require("../models/transactions")

 const getAll = async (items) =>{
    console.log("inside get all");
    const timestamp = new Date();
    for (const item of items){
        try{
            const transaction = new Transactions({
                item_id : item._id,
                type : "OUT",
                quantity : items.length,
                timestamp : timestamp
            })
            const saved = await transaction.save()
            console.log(saved);
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = getAll;