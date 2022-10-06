const mongoose = require('mongoose');
const { stringify } = require('querystring');
const _difficulty = require('../assets/Difficulty');

const prob = new mongoose.Schema({
    heading: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    hints:[{
        hint:{
            type:String
        }
    }],
    testCases:{
        type: String,
    },
    relatedTopics:[{
        topic:{
            type:String
        }
    }],
    difficulty:{
        type:Number
    },
    solution:{
        type:String,
        required:true
    },
    language:{
        //language used to Submit the solution
        type:String,
        required:true
    }
})

// This is a MiddleWare function. So it 
//takes next() function as parameter
prob.pre('save', async function(next){
    let avg=0;
    let count = 1;
    this.relatedTopics.forEach((topic)=>{
        console.log(topic);
        if(_difficulty.has(topic.topic)){
        avg += _difficulty.get(topic.topic)
        count += 1;
        }
    })
    this.difficulty=avg/count;
    // await this.save();
    next();
})

const Problems = mongoose.model('Problems', prob)

module.exports = Problems;