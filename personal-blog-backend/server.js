
// environment variavbles
require('dotenv').config();

// importing libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


//importing routing file
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

// instance of expresss application
const app = express();

//middleware
//adding CORS 
app.use(cors());
app.use(express.json());

// port defining
const PORT = process.env.PORT || 5000;


//mount the routes
//
app.use('/api/posts', postRoutes);

app.use('/api/auth',authRoutes);




//function to connect the Database and start the server
const startServer=async() => {
    try{

    await mongoose.connect(process.env.MONGO_URI);

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

