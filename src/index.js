const express = require("express")
require("./db/mongoos")
const app = express()
const Items = require("./models/items")
const  transactionType  = require("./process_helper/helperFunction")
const Transactions = require("./models/transactions")
const checkid = require("./process_helper/id_checker")
const checkNumber = require("./process_helper/number_chcker")
const mongoose = require("mongoose")

port = 3000

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/items",async (req,res)=>{
    try{
        const items = await Items.find({})
        res.status(200).send(items);
    }catch(err){
        res.status(500).send(err);
    }
})

app.get("/items/:id",(req,res)=>{
    if(!(checkid(req.params.id))){
        return res.status(404).send({"message":"invald id"})
    }
    Items.findById(req.params.id).then((item)=>{
        if(!item){
            return res.status(404).send({"message":"invalid id"});
        }
        res.status(200).send(item);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.post('/items',(req,res)=>{
    const preprocess = req.body;
    timestamp = new Date()
    preprocess["timestamp"] = timestamp;
    console.log((checkNumber(preprocess["quantity"])));
    if(!(checkNumber(preprocess["quantity"]))){
        return res.status(404).send({"message":"cast error"})
    }
    const item = new Items(preprocess);
    transactionType(item._id,timestamp,"IN");
    item.save().then((item)=>{
        res.status(201).send(item);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})



app.put("/items/:id",(req,res)=>{
    const timestamp = new Date()
    const item = JSON.parse(JSON.stringify(req.body))
    if(!(checkid(req.params.id)) || !checkNumber(item["quantity"]) ){
        return res.status(404).send({"message":"invalid query"})
    }
    item["timestamp"] = timestamp
    transactionType(req.params.id,timestamp,"IN");
    Items.findByIdAndUpdate(req.params.id,item,{new : true})
    .then((item)=>{
        if(!item){
            return res.status(404).send({"message":"invalid id"});
        }
        res.status(200).send(item);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})


app.delete("/items/:id",(req,res)=>{
    Items.findByIdAndDelete(req.params.id).then((item)=>{
        if(!item){
            return res.status(404).send({"message":"invalid id"});
        }
        transactionType(req.params.id,new Date(),"OUT")
        res.send(item);
    })
})

app.post("/items/:id/transaction",(req,res)=>{
    const transaction = new Transactions(req.body);
    if(!(checkid(req.params.id))){
        res.status(404).send({"message":"invalid id"})
    }
    transaction["item_id"] = req.params.id;
    transaction["timestamp"] = new Date();
    transaction.save()
    .then((transaction)=>{
        res.status(200).send(transaction)
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})


app.get("/items/:id/transactions",(req,res)=>{
    Transactions.find({item_id:req.params.id})
    .then((item)=>{
        if(!item){
            res.status(404).send({"message":"invalid id"})
        }
        res.status(200).send(item);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})

app.listen(port,(req,res)=>{console.log("listining at port "+port)})