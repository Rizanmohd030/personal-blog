
// environment variavbles
require('dotenv').config();

// importing libraries
const express = require('express');
const mongoose = require('mongoose');

// instance of expresss application
const app = express();


// port defining
const PORT = process.env.PORT || 5000;



//function to connect the Database and start the server
const startServer=async() => {
    try{

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");

    app.listen(PORT,() => {
    console.log(`Server is Alive and running on port ${PORT}`);
});

}catch(error){
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
    }
};


//calling function to start server
startServer();

