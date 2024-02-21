const mongoose = require("mongoose")

const itemsSchema = new mongoose.Schema(
    {
        name : {type:String, required:true,unique:true},
        description : {type:String, required:true},
        quantity : {type:Number,required:true},
        timestamp : {type: Date,required: true}
    })
itemsSchema.set('versionKey', false);

const Items = mongoose.model('Items',itemsSchema);

module.exports = Items