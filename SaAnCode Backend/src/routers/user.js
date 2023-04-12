const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth');
const { FindCursor } = require('mongodb');
const router = express.Router();

// CREATE USER
router.post('/user',async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        console.log('USER CREATED!')
        res.send(user)
    }catch(e){
        res.send(e);
    }    
})
//EDIT USER DETAILS
router.put('/user',auth,async(req,res)=>{
    const usr = await User.findByIdAndUpdate(req.user._id,req.body);
    res.send(usr)
    // const updates = Object.keys(req.body)//JSON.parse(req.body)
    // updates.forEach((property)=>{
    //     usr.property = req.body.property
    // })
    // try{
    //     await usr.save();
    //     res.send('Your Profile Successfully Updated!')
    // }
    // catch(e){
    //     res.status(400).send(e)
    // }
})

//LOGIN
router.post('/login',async (req,res)=>{
    try{
        console.log(req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        await user.generateAuthToken();
        res.send(user)
    }catch(e){
        res.status(400).send(e);
    }
})
 
router.get('/login/me',auth,async (req,res)=>{
    res.send(req.user);
})

// LOGOUT
router.get('/logout',auth, async(req,res)=>{
    try{ 
        req.user.token='';
        await req.user.save();
        res.send('LOGGED OUT ! ')
    }
    catch(e){
        res.status(401).send(e);
    }
    
})


// LIST OF ALL USERS
router.get('/logins',async (req,res)=>{
    try
    {
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(400).send('ERROR!! =>  ',e);
    }

})

//POPULATE ALL PROBLEMS OF CURRENT USER
router.get('/user/problems',auth, async(req,res)=>{
    await req.user.populate('userProblems');
    res.send(req.user.userProblems)
})

//POPULATE PROBLEMS BY USERiD
// router.get('/:userId/problems',auth,async(req,res)=>{
//     try{
//     const user = await User.findById(req.params.userId);
//     await user.populate('userProblems');
//     res.send(user.userProblems);
//     }catch(e){
//         res.send(e);
//     }
// })


module.exports = router;