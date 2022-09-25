const auth = require('../middleware/auth')
const express = require('express')
const Solution = require('../models/solutions')
const Problem = require('../models/problems')
const router = express.Router();

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