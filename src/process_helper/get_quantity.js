const Items = require("../models/items")

const getQuantity = async (name,value) =>{
    const items = await Items.find({"name":name});
    const length = items.length
    for(const item of items){
        item.quantity = length+value;
        item.save();
    }
    return length
}

module.exports = getQuantity;