const express = require('express')
const bookRouter = express.Router()
const jwt = require('jsonwebtoken')
const { BookModel } = require('../models/book.model')
const { auth } = require('../middlewares/auth.middleware')


bookRouter.post("/books", auth, async (req, res) => {
   
    try {
        const book = await BookModel(req.body)
        await book.save()
        res.status(201).send({"msg": "New Book Has Been Added"})
    } catch (error) {
      console.log(error)
      res.status(400).send({"msg": error.message})  
    }
})


bookRouter.patch("/books/:bookID", auth, async (req, res) => {

    const {bookID} = req.params
    const payload = req.body

    const token = req.headers.authorization
    const decoded = jwt.verify(token, 'mock')
    const req_id = decoded.userID
    const admin = decoded.admin
    const book = await BookModel.find({_id:bookID})

    try {
        if(admin){
            const book = await BookModel.findByIdAndUpdate({_id:bookID}, payload)
            res.status(204).send({"msg": "Book Has Been Updated"})
        } else {
            res.status(401).send({"msg": "You Are Not Authorized"})
        }
    } catch (error) {
       res.status(400).send({"msg":error.message})   
    }
})


bookRouter.delete("/books/:bookID", auth, async(req, res) => {

    const {bookID} = req.params
    const token = req.headers.authorization
    const decoded = jwt.verify(token, 'mock')
    const req_id = decoded.userID
    const admin = decoded.admin
    const book = await BookModel.find({_id:bookID})

    try {
        if(admin){
            const book = await BookModel.findByIdAndDelete({_id:bookID})
            res.status(202).send({"msg": "Book Has Been Deleted"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message}) 
    }

})

bookRouter.get("/books", async(req, res) => {
    
    const query = req.query
     console.log(query)

    if(query){
        try {
            const books = await BookModel.find({category: query.category})
            res.status(200).send(books)
        } catch (error) {
            res.status(400).send({"msg":error.message})  
        }
    } else {
        try {
            const books = await BookModel.find()
            res.status(200).send(books)
        } catch (error) {
            res.status(400).send({"msg":error.message})  
        }
    }

    
     
})


bookRouter.get("/books/:bookID", async(req, res) => {
    const {bookID} = req.params

    try {
        const books = await BookModel.find({_id:bookID})
        res.status(200).send(books)  
    } catch (error) {
        res.status(400).send({"msg":error.message})   
    }
})










module.exports = { bookRouter }