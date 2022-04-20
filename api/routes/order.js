const router = require('express').Router();
const Order = require('../models/Order');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('./verifyToken');

/* ---->  Create Order  <---- */

router.post("/",verifyToken, async (req,res) => {
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    }catch(err){
        return res.status(500).json(err);
    }
});

/* ---->  Update Order  <---- */

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        return res.status(200).json(updatedOrder)
    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Delete Order  <---- */

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("Order succesfully deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Get user Orders  <---- */

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.findOne({userId: req.params.userId});

        return res.status(200).json(orders);

    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Get all Orders <---- */

router.get("/", verifyTokenAndAdmin, async (req,res) => {
    try{
        const orders = await Order.find();
        return res.status(200).json(orders)
    }catch(err){
        return res.status(500).json(err);
    }
});

/* ---->  Get monthly income  <---- */

router.get("/income", verifyTokenAndAdmin, async (req, res)=> {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            {$match:{
                createdAt:{
                    $gte: previousMonth
                }, 
                ...(productId && {
               products: {
                   $elemMatch: {
                       productId
                    }
                } 
            })}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                },
            }, 
            {
                $group:{
                    _id:"$month",
                    total: {$sum: "$sales"},
                },
            },
        ]);
        return res.status(200).json(income);
    }catch(err){
        return res.status(500).json(err + "wtf");
    }
});

module.exports = router;