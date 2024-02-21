const mongoose = require("mongoose")
const Items = require("../models/items")


function checkid(id){
    if(mongoose.Types.ObjectId.isValid(id)){
        return true
    }
    return false;
}

module.exports = checkid