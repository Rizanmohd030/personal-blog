const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide username and password.',
            });
        }

        const user = await User.findOne({ userName }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials.',
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' } // Changed to hardcoded 30 days
        );

        // Changed response structure
        res.status(200).json({
            _id: user._id,
            username: user.userName, // Make sure this matches your field name
            token,
        });

    } catch (error) {
        console.error('LOGIN ERROR:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during login. Please try again later.',
        });
    }
};