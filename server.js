const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req,res) =>{
    console.log(req.url,req.method);
    console.log("requset made....");


    // lodash package
    let randomNumber = _.random(1,100);
    console.log(randomNumber);

       

    //header type
    res.setHeader('Content-Type','text/html');
    let path = "./views/";
    switch(req.url){
        case '/':
            path+='home.html';
            break;
        case '/about':
            path+='about.html';
            break;
        default:
            path+='404.html';
            break;
    }
    console.log("redirect path : "+path);
    //send html file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log("Error occure while reading a file");
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    });



});

server.listen(3000,'localhost',()=>{
    console.log("listening to the port 3000");
});