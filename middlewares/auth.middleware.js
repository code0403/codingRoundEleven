const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, 'mock', (err, decoded) => {
          console.log(decoded)
            if(decoded){
              console.log(decoded.userID)
              req.body.userID = decoded.userID
              next()
            } else {
                res.status(401).send({"msg" : "Please Login First"})
            }
        })  
    } else {
        res.status(400).send({"msg" : "Please Login First"})
    }
}

module.exports = { auth };