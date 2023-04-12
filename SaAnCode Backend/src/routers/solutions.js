const auth = require('../middleware/auth')
const express = require('express')
const Solution = require('../models/solutions')
const Problem = require('../models/problems')
const request = require('request')
const router = express.Router();

router.post('/getSolution',async(req,res)=>{
    var program ={
        script:req.body.script,
        language:req.body.language,
        clientId:"b3ea619b3f8a2a24845666b069b463f2",
        clientSecret:"eabbab96555556f8dd2c368f3b48225ffc3a28aab9a80de8f5ae05d979ba4809",
        stdin: req.body.stdIn
    };

    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },(error,response,body)=>{
        if(error){
            res.status(response.statusCode).send(body)
        }
        res.status(response.statusCode).send(body)  
    })
    console.log('code executed in jdoodle')
})

router.post('/write/solution/:problem_id',auth,async(req,res)=>{
    const solution = new Solution({...req.body,solver_id: req.user._id, problem_id: req.params.problem_id});
    try{
        await solution.save();
        res.send(solution)
    }catch(e){
        res.status(406).send(e);
    }
    
})

// All submissions of a problem ONLY OF THE USER
router.get('/submissions/:problem_id',auth,async(req,res)=>{
    const solutionsToProblem = await Solution.find({problem_id: req.params.problem_id, solver_id: req.user._id})
    if(solutionsToProblem){
        // console.log(solutionsToProblem)
        res.status(200).send(solutionsToProblem)
    }else{
        res.status(404).send("No Solutions")
    }
})

module.exports = router;