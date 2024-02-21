function checkNumber(number){
    if(typeof number =="number" && number>0){
        return true
    }
    
    return false;
}

module.exports = checkNumber