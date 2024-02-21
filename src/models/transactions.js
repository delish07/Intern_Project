const mongoose = require("mongoose")

const transactionsSchema = new mongoose.Schema(
    {
        item_id : {type : mongoose.Schema.Types.ObjectId ,required: true},
        type : { type: String, enum: ['IN', 'OUT']},
        quantity :  {type:Number,required : true},
        timestamp : {type:Date,required: true} 
    })
    transactionsSchema.set('versionKey', false);

const Transactions = mongoose.model('Transactions',transactionsSchema);

module.exports = Transactions