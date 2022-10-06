const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const Discussion = require('../models/discussions');
const Comment = require('../models/comments')
/*
    FUNCTIONALITIES INCLUDED:
       1 - User need to be authenticated
       2 - Can access all the discussions of a problem
       3 - Authenticated user can post discussion
       4 - Comments Routes are also mentioned in this ... 
    
    MISSING FUNCTIONALITIES:
        - upvoting
        -downvoting
*/

// 2
router.get('/discussions/:problem_id',auth, async(req,res)=>{
    const discussions = await Discussion.find({problem_id: req.params.problem_id});
    if(discussions){
        res.send(discussions);
    }else{
        res.status(404).send();
    }
})

router.post('/write/discussion/:problem_id',auth,async(req,res)=>{
    const discussion = new Discussion({...req.body, user_id: req.user._id, problem_id:req.params.problem_id})
    try{
        await discussion.save();
        res.send("New discussion posted successfully");
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/write/comment/:discussion_id',auth,async(req,res)=>{
    const comment = new Comment({...req.body,userId: req.user._id, discussionId: req.params.discussion_id})
    try{
        await comment.save();
        res.send("COMMENT SAVED !!")
    }catch(e){
        res.send(e)
    }
})

router.get('/read/comments/:discussion_id',auth,async(req,res)=>{
    res.send(await Comment.find({discussionId: req.params.discussion_id}))
})
module.exports= router