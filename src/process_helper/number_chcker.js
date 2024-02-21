const mongoose = require("mongoose")

function checkNumber(number){
    if(typeof number =="number"){
        return true
    }
    
    return false;
}

module.exports = checkNumber