const express = require("express")
require("./db/mongoos")
const app = express()
const Items = require("./models/items")
port = 3000

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Home Page")
})


app.post('/items',(req,res)=>{
    const pre = req.body;
    pre["timestamp"] = new Date();
    const item = new Items(pre);
    console.log(item);
    item.save().then((item)=>{
        res.status(200).send(item);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.get("/items",(req,res)=>{
    Items.find({})
    .then((items)=>{
        res.status(200).send(items)
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})

app.get("/items/:id",(req,res)=>{
    Items.findById(req.params.id).then((item)=>{
        if(!item){
            return res.status(404).send({"message":"invalid id"});
        }
        res.status(200).send(item);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.put("/items/:id",(req,res)=>{
    Items.findByIdAndUpdate(req.params.id,req.body,{new : true})
    .then((item)=>{
        if(!item){
            return res.status(404).send();
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
            return res.status(404).send();
        }
        res.send(item);
    })
})


app.listen(port,(req,res)=>{console.log("listining at port "+port)})