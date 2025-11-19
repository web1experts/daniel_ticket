
const mongoose = require('mongoose');
const createError = require('http-errors');
const Model = require('../../../../models');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendOtpEmail} = require('../../../../utils/emailGenerator');

/** -- @function login Company Owner / Company Employee Is Used to allow login based token with roles -- */
/**
 * 
 * @method Unauthorized Status Code :  401,
 * @method NotFound Status Code : 404
 * @method PaymentRequired STatus Code 402
 * @method UpgradeRequired Status Code : 426
 * @method BadRequest Status Code : 400
 */
exports.login = async (req, res, next) => {
//     try {
//       const { userName, password } = req.body;
  
//       // 1. Validate input
//       if (!userName || !password) {
//         return res.status(400).json({ error: 'Username/email and password are required.' });
//       }
  
//       // 2. Find user by email or username, AND must be emailVerified
//       const user = await Model.User.findOne({
//         $or: [{ email: userName.toLowerCase() }, { userName: userName }],
//         emailVerified: true
//       });


//       console.log("user----34444", user)
  
//       if (!user) {
//         return res.status(401).json({ error: 'Invalid credentials or email not verified.' });
//       }
  
//       // 3. Compare password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid credentials.' });
//       }
  
//       // 4. Generate JWT
//       const token = jwt.sign(
//         {
//             userId:user._id,
//             email:user.email,
//             firstName:user.firstName,
//             username:user.userName,
//             lastName : user.lastName
//         }, 
//         process.env.JWT_SECRET,
//         {
//             expiresIn:"15 days"    
//         }
//       );

//       return res.status(200).json({
//         success: true,
//         message: 'Login successful',
//         token,
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       next(error);
//     }
};


exports.signUp = async(req , res ,next) =>{
//     try{
//         const { firstName, lastName, email, userName, password} = req.body;
//         const existingUser = await Model.User.findOne({ $or: [{ email }, { userName }] });
//         if (existingUser) {
//             return res.status(409).json({ message: 'Email or username already in use' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const payload = {
//             firstName,
//             lastName,
//             email,
//             userName,
//             password: hashedPassword,
//             otp,
//         };


//         console.log("payload", payload)
       
//         const user = await Model.User.create(payload);

//         if(!user)throw createError.InternalServerError('Unable to proceed your request please try later')

//         const body = {name:firstName , otp: otp}

//         await sendOtpEmail(email , body)
       
//         res.status(200).json({
//             success: true,
//             message: "Account Created Successfully!",
//         })
        
//     }catch(error){
//         next(error)
//     }
}


exports.verifyOtp = async(req, res, next) => {
    try {
        const { otp, email } = req.body;
        if (!email || !otp){
            res.status(400).json({ success: false, message: 'Email and Otp is required'});
        }
        const numericOtp =otp;  
        const user = await Model.User.findOne({ email, otp:numericOtp });
        if (!user){
            res.status(400).json({ success: false, message: 'User not found'});
        }
        
        user.otp = ''
        user.emailVerified = true

        console.log("user" , user)
        await user.save();        
        const token = jwt.sign(
            {
                userId:user._id,
                email:user.email,
                firstName:user.firstName,
                username:user.userName,
                lastName : user.lastName
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn:"15 days"    
            }
        )
        res.status(200).json({ success: true, message: 'OTP Verified' , token , firstLogin: true });
    }catch (error) {
        next(error)
    }
}


exports.resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        // Find the user
        const user = await Model.User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        if (user.emailVerified) {
            return res.status(400).json({ success: false, message: "Email already verified." });
        }
        const otp = Math.floor(100000 + Math.random() * 900000); 
        user.otp = otp;
        await user.save();

        const body = {name:user.firstName , otp: otp}

        await sendOtpEmail(email , body)

        return res.status(200).json({ success:true , message: 'OTP resent successfully.' });
       
    } catch (err) {
        console.error("Resend OTP Error:", err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.forgetPassword = async(req , res) =>{
    try{

        const {email} =  req.body

        console.log("req.body" , req.body)

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await Model.User.findOne({ email: email });


        if (!user) {
            return res.status(200).json({ success: false, message: "User not found." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); 
        user.otp = otp;
        await user.save();

        const body = {name:user.firstName , otp: otp}

        await sendOtpEmail(email , body)

       

        return res.status(200).json({ success:true , message: 'OTP sent successfully.' , userData:user });
       
    }catch(error){
        console.log("error===== 211" , error)
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}


exports.verifyPassOtp = async(req , res) =>{
    try{
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email  and Otp is required." });
        }
        const numericOtp = Number(otp);

        const user = await Model.User.findOne({ email, otp:numericOtp });
        if (!user){
            res.status(200).json({ success: false, message: 'The OTP you entered is incorrect'});
        }
        user.otp = null
        user.emailVerified = true
        await user.save();        
        res.status(200).json({ success: true, message: 'OTP Verified' , userData:user});
    }catch(err){
        return res.status(500).json({ success: false, message: "Internal server error." });
    }

}

exports.resetPass = async(req , res) =>{
//     try{
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "Email  and Password is required." });
//         }
//         const user = await  Model.User.findOne({ email: email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }
//             const hashedPassword = bcrypt.hashSync(password, 10);
//             user.password = hashedPassword
//             await user.save();        
//             const token = jwt.sign(
//                 {
//                     userId:user._id,
//                     email:user.email,
//                     firstName:user.firstName,
//                     username:user.userName,
//                     lastName : user.lastName
//                 }, 
//                 process.env.JWT_SECRET,
//                 {
//                     expiresIn:"15 days"    
//                 }
//             )
//             res.status(200).json({ success: true, message: 'Password Updated Successfully ' , token});
//     }catch(err){
//         console.log("error=====272" , err)
//         return res.status(500).json({ success: false, message: "Internal server error." });
//     }
}



// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Model.User.find(); // Fetch all users from the database

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};










