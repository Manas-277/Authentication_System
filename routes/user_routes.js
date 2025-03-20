import express from 'express'; // Import the express library
import displayCartItems from '../controller/controller_logic.js'; // Import the displayCartItems controller function
import { login, register, verifyUser, getAllUser, getUser, updateUser, deleteUser } from '../controller/user.controller.js';

const router = express.Router(); // Create a new router instance

// Define a GET request for the /cart_items endpoint
router.get('/cart_items', displayCartItems); // Use the displayCartItems function to handle the request
router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyUser);
router.get('/getAllUser', getAllUser); // get all user from DB
router.get('/getUser/:id', getUser); // get a user by id from DB
router.post('/updateUser/:id', updateUser); // update a user by id in DB
router.get('/deleteUser/:id', deleteUser); // update a user by id in DB

// Export the router instance as the default export
export default router;