const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/index');


const app = express();
const port = 9000;

const  connectionDB = async() => {
    try{

       await mongoose.connect('mongodb+srv://admin:admin1234@batchapril.wbazhct.mongodb.net/learnandgrow?retryWrites=true&w=majority');
       console.log("db connected");
    }catch(e){
        console.log("Error while connecting to db",e.message);
    }
}
connectionDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api', apiRoutes);

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})
