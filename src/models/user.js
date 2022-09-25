const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required:true
    },
    email:{ // preferred user name to login
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required: true
    },
    password:{ // password to login
        type:String,
        required: true
    },
    occupation:{
        type : String
    },
    token:{
        type:String,
    }
})

userSchema.virtual('userProblems',{
    ref:'Problems',
    localField:'_id',
    foreignField:'creator'
})

userSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({ _id:this._id.toString() },'timepass');
    this.token = token;
    await this.save();
    // console.log('TOKEN: '+token);
}

userSchema.statics.findByCredentials = async function (email, password){
    // console.log("Entered into findByCredentials")
    const user = await User.find({ email });
    // console.log(user[0])
    if(!user[0] || user[0].password !== password){
        throw new Error("Wrong login credentials");
        return console.log('login failed')
    }
    return user[0];
}

const User = mongoose.model('User', userSchema)
module.exports = User;