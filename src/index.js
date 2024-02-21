const express = require("express")
const transactionType  = require("./process_helper/helperFunction")
const checkid = require("./process_helper/id_checker")
const checkNumber = require("./process_helper/number_chcker")
const getTimestamp = require("./process_helper/getTimestamp")

require("./db/mongoos")

const Items = require("./models/items")
const Transactions = require("./models/transactions")

const app = express()
app.use(express.json())

port = 3000

const invalidID = {"message":"invalid id"}
const invalidValue = {"message":"invalid value"}

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/items",async (req,res)=>{
    try{
        const items = await Items.find({})
        res.status(200).send(items);
    }catch(err){
        res.status(500).send(err.name);
    }
})

app.get("/items/:id",(req,res)=>{
    if(!(checkid(req.params.id))){
        return res.status(404).send(invalidID)
    }
    Items.findById(req.params.id).then((item)=>{
        if(!item){
            return res.status(404).send(invalidID);
        }
        res.status(200).send(item);
    }).catch((err)=>{
        res.status(500).send(err.name);
    })
})

app.post('/items',(req,res)=>{
    const preprocess = req.body;
    const timestamp = getTimestamp()
    preprocess["timestamp"] = timestamp;
    console.log((checkNumber(preprocess["quantity"])));
    if(!(checkNumber(preprocess["quantity"]))){
        return res.status(404).send(invalidValue)
    }
    const item = new Items(preprocess);
    transactionType(item._id,timestamp,"IN");
    item.save().then((item)=>{
        res.status(201).send(item);
    }).catch((err)=>{
        res.status(400).send(err.name);
    })
})

app.put("/items/:id",(req,res)=>{
    const timestamp = getTimestamp()
    const item = JSON.parse(JSON.stringify(req.body))
    if(!(checkid(req.params.id))){
        return res.status(404).send(invalidID)
    }
    if(!checkNumber(item["quantity"])){
        return res.status(404).send(invalidValue)
    }
    item["timestamp"] = timestamp
    transactionType(req.params.id,timestamp,"IN");
    Items.findByIdAndUpdate(req.params.id,item,{new : true})
    .then((item)=>{
        if(!item){
            return res.status(404).send(invalidID);
        }
        res.status(200).send(item);
    })
    .catch((err)=>{
        res.status(500).send(err.name);
    })
})

app.delete("/items/:id",(req,res)=>{
    if(!checkid(req.params.id)){
        return res.status(404).send(invalidID)
    }
    Items.findByIdAndDelete(req.params.id).then((item)=>{
        if(!item){
            return res.status(404).send(invalidID);
        }
        transactionType(req.params.id,getTimestamp(),"OUT")
        res.send(item);
    })
})



app.get("/items/:id/transactions",(req,res)=>{
    if(!checkid(req.params.id)){
        return res.status(404).send(invalidID)
    }
    Transactions.find({item_id:req.params.id})
    .then((item)=>{
        if(!item){
            res.status(404).send(invalidID)
        }
        res.status(200).send(item);
    })
    .catch((err)=>{
        res.status(500).send(err.name);
    })
})


app.post("/items/:id/transactions",(req,res)=>{
    const transaction = new Transactions(req.body);
    if(!(checkNumber(transaction["quantity"]))){
        return res.status(404).send(invalidValue)
    }
    if(!(transaction["type"]=="IN" || transaction["type"]=="OUT")){
        return res.status(404).send({"message":"type should be either IN or OUT"})
    }
    if(!(checkid(req.params.id))){
        return res.status(404).send(invalidID)
    }
    transaction["item_id"] = req.params.id;
    transaction["timestamp"] = getTimestamp();
    transaction.save()
    .then((transaction)=>{
        res.status(200).send(transaction)
    })
    .catch((err)=>{
        res.status(500).send(err.name);
    })
})

app.use((req, res, next) => {
    // Handle 404 - Not Found
    res.status(404).send({"message":'endpoint not found'});
});

app.listen(port,(req,res)=>{console.log("listining at port "+port)})