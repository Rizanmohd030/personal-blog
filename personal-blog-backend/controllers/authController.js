const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//function to intreact with database
exports.login = async(req,res) =>{
    try{
    const {userName , password} = req.body;

    //checking if it exists
    if(!userName || !password){
        return res.status(400).json({
            status:'Fail',
            message:'Please provide username and password.',
        });
    }
    // We explicitly ask to include the password field using .select('+password').
    // It's good practice to set 'select: false' on password fields in the schema
    // and only include it when needed, like here for authentication.
    const user = await User.findOne({userName}).select('+password');

    // Check if user exists AND if the password is correct
    // We use our custom 'comparePassword' method from the userModel.
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials.',
    });

}
    // 7. If credentials are correct, create and sign a JWT
    const payload = {id:user._id}; //the payload contains user uinque id

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        status:'Succes',
        token,
    });
}  catch(error){
    console.error('LOGIN ERROR:',error);
    res.status(500).json({
        status:'Error',
        message:'An error occurred during login. Please try again later.',
    });
}
};