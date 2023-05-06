const express = require("express")
const { OrderModel } = require("../models/order.model")
const { BookModel } = require("../models/book.model")
const OrderRouter = express.Router()


OrderRouter.post("/order", async (req, res) => {

    try {
        const order = await OrderModel(req.body)
        await order.save()
        res.status(201).send({"msg": "Book Has Been Ordered"})
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg": error.message})    
    }
})


OrderRouter.get("/orders", async (req, res) => {
    try {
        const orders = await OrderModel.find()
        console.log(orders[0])
        // const booksOrders = await BookModel.find({_id:orders})
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({"msg":error.message})  
    }
})


module.exports = { OrderRouter }