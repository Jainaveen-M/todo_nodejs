const express = require("express");
const { result } = require("lodash");

const app = express();
const mongoose = require('mongoose');
const item = require("./model/items");
//mongodb 

const dbURI = '';
mongoose.connect(dbURI)
.then((result)=>{
    console.log("connted to db..");
    app.listen(5000);
})
.catch(()=>{console.log("error")});

//storing data from mongodb

app.get('/db',(req,res)=>{
    const itemModel = new item({
        title:'dev',
        desc:'nodejs development',
    });
    itemModel.save().then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    });
});


//storing data from mongodb

app.get('/get-db',(req,res)=>{
    item.find()
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

//getting single doc from db

app.get('/single-doc',(req,res)=>{
    item.findById("61b5f2ab7d6c166269e24150")
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get("/",(req,res)=>{
    res.sendFile("./views/home.html",{root:__dirname});
});
app.get("/about",(req,res)=>{
    res.sendFile("./views/about.html",{root:__dirname});
});
//redirect 
app.get("/about-us",(req,res)=>{
    res.sendFile("./views/about.html",{root:__dirname});
});

//404  use at the last.
app.use((req,res)=>{
    res.status(404).sendFile("./views/404.html",{root:__dirname});
});
