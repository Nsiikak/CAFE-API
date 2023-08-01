const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const DB= process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB)
.then(con =>{
   // console.log(con.connections)
    console.log("SUCCESSFUL CONNECTION TO DATABASE")
})
.catch(error=>{
    console.log("Error connecting to the database")
});


app.use(express.json());

const customersRouter = require('./routes/customersRoute');
app.use('/customers',customersRouter);


const port= 5000;
app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
})