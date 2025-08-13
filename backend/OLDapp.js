// // Imports
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');

// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');

// // Create app, configure to parse JSON requests
// const app = express ();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/collectors')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/users', userRoutes);
// app.use('/auth', authRoutes);

// // Server code
// const PORT = process.env.PORT || 3000;

// // Listen to specified port
// app.listen(PORT, () => {
//     console.log("Server Listening on PORT:", PORT);
// });


// app.get("/status", (request, response) =>{
//     const status = {
//         "Status": "Running"
//     };
//     response.send(status);
// });

