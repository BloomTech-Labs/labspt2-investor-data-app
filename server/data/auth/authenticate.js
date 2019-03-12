
//Adding jwt token 
const jwt = require('jsonwebtoken')

const jwtKey =
process.env.JWT_SECRET || "supercalifragilisticexpialidocious"


// quickly see what this file exports
module.exports = {
    authenticate,
    generateToken
  };

// To authenticate the user  
function authenticate (req, res, next)  {
    const token = req.get("Authorization")

    if(token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if(err) return res.status(401).json(err)
            req.decoded = decoded 
            next()
        })
    } else {
        return res.status(401).json({
            error: "No token provided, must be set on Authorization Header"
        })
    }
}

// this will generate the token for the user 
function generateToken(user){
    //get the username 
    const payload ={
        username: user.username
    }
    //Expire the user in an hour
    const options = {
        expiresIN: '1hr'
    }
    return jwt.sign(payload, jwtKey, options)
}