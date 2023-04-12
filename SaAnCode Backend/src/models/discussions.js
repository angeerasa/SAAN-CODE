const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    problem_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Problem',
        required:true
    },
    title:{
        type: String,
        required: true
    },
    discussion:{
        type:String,
        required:true
    },
    upVotes:{
        type:Number,
        default: ()=>{
            return 0
        }
    },
    downVotes:{
        type:Number,
        default:()=>{
            return 0
        }
    }
})

const Discussion = mongoose.model('Discussion',Schema);

module.exports= Discussion;