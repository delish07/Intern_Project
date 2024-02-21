const mongoose = require("mongoose")

const transactionsSchema = new mongoose.Schema(
    {
        item_id : mongoose.Schema.Types.ObjectId,
        type : { type: String, enum: ['IN', 'OUT']},
        quantity : Number,
        timestamp : Date
    })
    transactionsSchema.set('versionKey', false);

const Transactions = mongoose.model('Transactions',transactionsSchema);

module.exports = Transactions