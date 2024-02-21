const mongoose = require("mongoose")

function checkid(id){
    if(mongoose.Types.ObjectId.isValid(id)){
        return true
    }
    return false;
}

module.exports = checkid