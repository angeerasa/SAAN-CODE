const express = require('express')
const auth = require('../middleware/auth')
const Problem = require('../models/problems')
const router = express.Router();



router.post('/write/problem',auth, async(req,res)=>{
    const problem = new Problem({...req.body, creator: req.user._id});
    await problem.save()
    res.send(problem);
})

router.get('/problems', async(req,res)=>{
	const problems = await Problem.find();
	res.send(problems);
})

// Get Creator of a particular problem
router.get('/user/:problem_id', auth, async(req,res)=>{
	const prob = await Problem.findById(req.params.problem_id);
	try{
		await prob.populate('creator');
		const user = prob.creator;
		await user.populate('userProblems');
		res.send({user: user, userProblems: user.userProblems.length});
	}catch(error){
		res.send("error::::"+error);
	}
})

router.get('/problem/:problem_id',async(req,res)=>{
	const problem = await Problem.findById(req.params.problem_id);
	if(problem){
		res.status(200).send(problem);
	}else{
		res.status(400);
	}
})

module.exports = router;