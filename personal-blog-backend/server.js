











// environment variables
require('dotenv').config();

// importing libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// importing routing file
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

// instance of express application
const app = express();

// middleware
// FIX: Simple CORS that will work
app.use(cors()); // This allows ALL origins - we can restrict later

app.use(express.json());

// port defining
const PORT = process.env.PORT || 5000;

// mount the routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// function to connect the Database and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is Alive and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

// calling function to start server
startServer();








































































// // environment variavbles
// require('dotenv').config();

// // importing libraries
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');


// //importing routing file
// const postRoutes = require('./routes/postRoutes');
// const authRoutes = require('./routes/authRoutes');

// // instance of expresss application
// const app = express();

// // 1. Define the list of allowed origins (your "guest list").
// //    We pull the frontend URL from the environment variables.
// const whitelist = [process.env.FRONTEND_URL];

// // 2. Configure CORS options with a dynamic origin function.
// const corsOptions = {
//   // The 'origin' parameter is the domain making the request (e.g., 'http://localhost:3000').
//   origin: (origin, callback) => {
//     // 3. Check if the incoming origin is in our whitelist.
//     //    The '|| !origin' part is a crucial addition. It allows requests that don't have an origin,
//     //    such as server-to-server requests or requests from tools like Postman.
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       // If the origin is on the guest list (or there's no origin), allow it.
//       // The callback's first argument is for an error (null here), and the second is a boolean (true = allow).
//       callback(null, true);
//     } else {
//       // If the origin is not on the guest list, reject it.
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   // Some legacy browsers (IE11, various SmartTVs) choke on 204
//   optionsSuccessStatus: 200
// };

// //middleware
// //adding CORS 
// app.use(cors(corsOptions));
// app.use(express.json());


// // 2. Access the MONGO_URI from process.env instead of a hard-coded string.
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connection established successfully.'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // port defining
// const PORT = process.env.PORT || 5000;


// //mount the routes
// //
// app.use('/api/posts', postRoutes);

// app.use('/api/auth',authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);

// });






























































/////////
// //function to connect the Database and start the server
// const startServer=async() => {
//     try{

//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("Database connected successfully");

//     app.listen(PORT,() => {
//     console.log(`Server is Alive and running on port ${PORT}`);
// });

// }catch(error){
//     console.error("Error connecting to the database:", error);
//     process.exit(1); // Exit the process with failure
//     }
// };


//calling function to start server


