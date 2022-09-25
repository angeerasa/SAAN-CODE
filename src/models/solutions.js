const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    problem_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        reference: 'Problems'
    },
    solver_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    solution:{
        type:String,
        required:true
    }
})

const Solutions = mongoose.model('Soutions',Schema);
module.exports = Solutions;