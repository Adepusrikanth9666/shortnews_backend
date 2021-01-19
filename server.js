const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
require('dotenv').config();


const  app = express();
const port = 7000 ;

console.log(process.env.MONGODB_CONNECTION_STRING);

const whitelist = ['http://localhost:3000']
const corsOption = {
  origin:function(origin,callback){
    if(whitelist.indexOf(origin)!==-1){
      callback(null,true)
    }else{
      callback(new Error('Not allowed by CROS'));
    }
  }
}
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

  console.log(process.env.MONGODB_CONNECTION_STRING);
  console.log("hello");
  app.listen(port,()=>console.log(`the server has started on port :${port}`));
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
    
},(err)=>{

    if(err){ throw err }; 
    console.log("MongoDb connection is established");
})


app.use("/users",require('./routes/user'))




