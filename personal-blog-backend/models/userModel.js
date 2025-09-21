const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },

    },
    {
        timestamps:true,
    }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        ///generating salt
        const salt = await bcrypt.genSalt(12);

        //now hash the passwod with this salt
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;

        next();
    }catch(error){
        next(error);
    }
});
//Define a custom method on the userSchema.
userSchema.methods.comparePassword = async function(candidatePassword){
    // Use bcrypt.compare() to check for a match.
    // This is the core of the verification process.
    // - candidatePassword: The plain-text password provided by the user during login.
    // - this.password: The hashed password stored in the database for this specific user document.
    try{
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
    }catch(error){
        throw error;
    }
};
const User = mongoose.model('User',userSchema);

module.exports = User;