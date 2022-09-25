const mongoose = require('mongoose');

const Problems = mongoose.model('Problems', {
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
    }]
})

module.exports = Problems;