import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationToken:{
        type: String
    }

})

const User = mongoose.model('User', user_schema);

export default User;