import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import {sendMail} from '../utility/emailAutomation.js'

export const register = async (req, res)=>{
    try {
    const {name, email, password} = req.body;

    //validate -> some data should come
    if(!name || !email || !password){
        return res.status(404).json({
            message: "Fill all the required fields"
        })
    }

    //check if user already exists
    const user = await User.findOne({email})
    if(user) {
        return res.status(400).json({
            message: "User already Exists!"
        })
    }

    //hash the password
    const hashed_pass = await bcrypt.hash(password, 10);
    // make a entry in the DB
    const newUser  = new User({
        name, email, password : hashed_pass
    })

    //genrate token
    const verificationToken = crypto.randomBytes(16).toString('hex');
    newUser.verificationToken = verificationToken;
    console.log("Token: ", verificationToken);
    const option = {
        from:process.env.NODEMAILER_HOST,
        to:email,
        subject: "Please Verify your email aaaa!",
        text: `Hello ${name}!, please click on this link for verification`,
        html: `<a href="https://animated-fishstick-6x76jwppwwj25pq5-8001.app.github.dev/user/verify/${verificationToken}">Hey buddy, click here aaaa!</a>`
    }

    await sendMail(option);
    //save user in DB
    await newUser.save();
    return res.status(201).json({
        message: `User account created sucessfully for ${newUser.name}`,
        newUser
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in user_controller register function!"
        })
    }
}

export const login = async (req,res) =>{
    try {
        //take the data
        const {email, password} = req.body;
        //validate
        if(!email || !password) {
            return res.status(400).json({
                message: "Email or Password not found!"
            })
        }
        //check if email exists in DB
        const user = await User.findOne({email});
        console.log(user);
        
        if(!user){
            return res.status(400).json({
                message: "Either Email or password Incorrect"
            })
        }

        const isValid = await bcrypt.compare(password, user.password); // (loginForm_pass, pass_in_DB)
        if(!isValid){
            return res.status(400).json({
                message: "Either Email or password Incorrect"
            })
        }
        return res.status(400).json({
            message: "Logged In sucessfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in user_controller login function!"
        })
    }
}

export const verifyUser = async (req, res) =>{
    try {
        const {token}= req.params;
    	// res.send(token);
    
        if(!token){
            return res.status(400).json({
                message : "Token not validated!"
            })
        }
    
        //validate token
        const user = await User.findOne({verificationToken : token});
        if(!user){
            console.log("Incorrect Token!");
            return res.status(404).json({
                message: "Incorrect Token!"
            })
        }
        //make verified flag as true because it is matched
        user.isVerified = true;
        //remove token because work is done
        user.verificationToken = undefined;
        //now finally save the user in the DB
        await user.save();
        //send msg that user is verified
        return res.status(200).json({
            message: "User verified sucessfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Undefined Server Error!"
        })
    }
}

export const getUser = async(req,res)=>{
    //get userID
    try {
        const {id} = req.params;
        const user = await User.findOne({_id : id});
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }

        return res.status(500).json({
            message: `User found!`, 
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: `Internal server error `, 
        })
    }
}

export const getAllUser = async(req,res)=>{
    try {
        console.log("helo");
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                message: "Users not found!"
            })
        }

        return res.status(200).json({
            message: "Users found!",
            users
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error: in getAllUsers`, 
        })
    }
}

export const updateUser = async(req,res)=>{
    try {
        const {id} = req.params;
        
        const user = await User.findOneAndUpdate({_id : id},{...req.body});
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }

        // user = {...user, ...req.body};
        // await user.save()
        return res.status(200).json({
            message: "User updated successfully!",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: `Internal server error `, 
        })
    }
}


export const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        
        const user = await User.deleteOne({_id : id});
        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }

        // user = {...user, ...req.body};
        // await user.save()
        return res.status(200).json({
            message: "User deleted successfully!",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: `Internal server error `, 
        })
    }
}

