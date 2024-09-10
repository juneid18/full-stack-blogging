import mongoose from "mongoose";
// creating a user Schema and model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "please provide an password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User =mongoose.models.users || mongoose.model('users', userSchema);

export default User;