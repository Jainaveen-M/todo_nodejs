console.log("welcome to javascript!.")

// fetch('https://api.chucknorris.io/jokes/random').then((response)=>{
//    return response.json();
// }).then((data) =>{
//     console.log("Joke :"+data.value);
// }).catch();

function onBtnPressed(){
    console.log(document.getElementById('title').innerText);
}

var shop_open = true;

function fun  (){
   return new Promise((resolve, rejected)=>{
        if(shop_open){
            resolve(console.log("resolved ....."));
        }
        else{
            rejected(console.log("rejected ....."));
        }
   });
}   

fun().then(console.log("success...")).catch(console.log("error occured"));