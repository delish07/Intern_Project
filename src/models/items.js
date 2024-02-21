const mongoose = require("mongoose")

const itemsSchema = new mongoose.Schema(
    {
        name : String,
        description : String,
        quantity : Number,
        timestamp : Date
    })
itemsSchema.set('versionKey', false);

const Items = mongoose.model('Items',itemsSchema);

module.exports = Items