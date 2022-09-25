const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'timepass');
        // console.log(decoded)
        const user = await User.findOne({_id: decoded._id, token});
        // console.log(user)
        if(!user){
            throw new Error();
        }
        req.user = user;
        next();
    }catch(e){
        res.status(401).send({'error': 'Login Auth failed!'})
    }
}

module.exports = auth;