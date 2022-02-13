const express = require("express");
const { result } = require("lodash");

const app = express();
const mongoose = require('mongoose');
const Item = require("./model/items");

const port = Process.env.PORT || 3000 ;
//mongodb 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());
const dbURI = 'mongodb+srv://admin:admin123@cluster0.wgqh2.mongodb.net/todo?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>{
    console.log("connted to db..");
    // listing to port 
   // app.listen(5566);
    // app.listen(port,()=>{
    //     console.log("listening to port "+port);
    // });
})
.catch(()=>{console.log("error")});

//storing data to mongodb

app.post('/db',(req,res)=>{
  //  const item = new Item(req.body);
  console.log(req);
  const item = new Item({
    title:req.body.title,
    desc:req.body.desc,
});
    console.log(req.body);
    item.save().then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    });
});

//storing data from mongodb
app.get('/get-db',(req,res)=>{
    Item.find()
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});


// query from mongo db
app.get('/getTodos/:number',(req,res)=>{
    console.log(req.params.number);
    Item.find().limit(Number(req.params.number))
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
    });
});

//update mongo db using id
app.put('/update/:id',(req,res)=>{
    console.log(req.params.id);
    const item = new Item({
        title:req.body.title,
        desc:req.body.desc,
    });
    const id = req.params.id;
    Item.findByIdAndUpdate(id)
    .then((result)=>{
        if(!result){
            res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
        }
        else{
            res.send(item);
        }
       
    })
    .catch((err)=>{
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
          });
    });
});

//delete using id
app.delete("/delete/:id",(req,res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    Item.findByIdAndRemove(id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});

//getting single doc from db
app.get('/single-doc',(req,res)=>{
    Item.findById("61b5f2ab7d6c166269e24150")
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get("/",(req,res)=>{
    res.send("welcome to herko app");
   // res.sendFile("./views/home.html",{root:__dirname});
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
