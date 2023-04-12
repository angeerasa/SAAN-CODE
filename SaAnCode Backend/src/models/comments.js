const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    comment:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    discussionId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Discussion'
    }
})

const Comment = mongoose.model('Comment',Schema);

module.exports = Comment;