const express = require('express')
const UserRouter = express.Router()
const bcrypt = require('bcrypt')
const { UserModel } = require('../models/user.model')
var jwt = require('jsonwebtoken');

UserRouter.post('/register', async (req, res) => {

    const {name, email, password, isAdmin} = req.body

    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        console.log(password, hash)
         const user = new UserModel({name, email, password:hash, isAdmin})
         await user.save()
         res.status(201).send({'msg' : 'Registertion Sucessful'})  
      })  
    } catch (error) {
      res.status(201).send({'msg' : error.message})  
    }
})

// login

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const userData = await UserModel.find({email:email})
        console.log(userData[0])
        if (userData.length > 0) {
            const user = userData[0]
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({"msg": "Login Sucessful", "token" : jwt.sign({"userID" :user._id, "admin":user.isAdmin}, 'mock')})
                } else {
                   res.status(401).send({"msg": "Invalid Credentials"})
                }
            })
        }    
    } catch (error) {
       res.status(400).send({'msg': error.message}) 
    }
})

module.exports = { UserRouter }