import express from 'express'; // Import Express which is a routing library
import userRouter from './routes/user_routes.js'; // Import the user routes
import dotenv from "dotenv";
import connectDB from "./utility/db.js"

const PORT = process.env.PORT || 3000;

const app = express(); // Create an instance of the express application
dotenv.config();


connectDB()
.then(()=>{
  // Use the user routes for any requests to /user
  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.use('/user', userRouter);

  // Start the server and listen on port 8001
  app.listen(PORT, () => {
  console.log('Server is UP'); // Log a message when the server is up and running
  });
})
.catch((e)=>{
  console.log("Error in connecting DB:",e);
});

// // Define a GET request for the /user endpoint
// app.get('/user', (req, res) => {
//   res.send('Welcome!'); // Send a response with the message "Welcome!"
// });