const express= require('express');
const router = express.Router();
const customer = require('../models/customerModel');

async function checkID(req,res,next)  {
  let customer
    try{
        customer= await customer.findById(req.body.id)
        if(customer==null)
        { 
          return res.status(404).json({
               status:"failed",
               message: "Customer doesn't exist"
           })
        }
       }
    catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
    res.customer = customer;
    next()
};


//getting all customers
router.get('/', async (req,res)=>{
   
 try{
     const customers = await customer.find()
     res.json(customers)
    }
 catch(err){
     res.status(500).json({
     message: err.message
     })
    }
});

//getting one customer
router.get('/:id',checkID, (req,res)=>{
 res.json(res.customer)
});

//creating a customer
router.post('/', async (req,res)=>{
  const customer = new customer({
    name:req.body.name,
    timeOfOrder:req.body.timeOfOrder,
    satisfactionLevel:req.body.satisfactionLevel
  })
    try{
    const newCustomer = await customer.save()
    res.status(201).json(newCustomer)
    }
    catch(err){
    res.status(400).json({
        message: err.message
    })
    }

});

//updating one customer
router.patch('/:id',checkID, async (req,res)=>{
    if(req.body.name != null)
    {
        res.customer.name = req.body.name
    }
    if(req.body.satisfactionLevel != null)
    {
        res.customer.satisfactionLevel = req.body.satisfactionLevel
    }
    try{
        const updatedCustomer = await res.customer.save()
        res.json(res.customer)
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }

});

//deleting one customer
router.delete('/:id',checkID,async (req,res)=>{
    try{
     await res.customer.remove()
     res.json({
        message:"deleted customer"
     })
    }

    catch(err){
        res.status(500).json({
            message: err.message
        })
     }

});



module.exports= router;