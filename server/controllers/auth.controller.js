const User = require("../repository/user.schema");
const { genrateJwtToken, encryptPassword, } = require("../config/SecurityConfig");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const asyncErrorHandler = require("../config/GlobalExceptionHandler");



dotenv.config();


const registerUser = asyncErrorHandler(async (req, res) => {
    const user = req.body;
    const {email,name,password} = user;
    if(!email){
        res.status(400).json({
            message:"email is required"
        })
        return ;
    }else if(!name){
        res.status(400).json({
            message:"name is required"
        })
        return ;
    }if(!password){
        res.status(400).json({
            message:"password is required"
        })
        return ;
    }

     const result = await User.findOne({email});
        if(result){
             res.status(400).json({
                status:false,
                message:"email is alredy exist"
            })
            return ;
        }
    

    const hash = await encryptPassword(user.password);
    user.password = hash;
    user.role ="USER";
    const savedUser = await User.create(user);
    res.status(200).json({
        status:true,
        message: "user is successfully registered",
    });
})



const login = asyncErrorHandler(async (req, res) => {
    const { password, email } = req.body;
    const [user] = await User.find({ email });
    if(!user){
        res.status(400).json({
            status:false,
            message:"user is not registered"
        })
        return;
    }
    const result = await bcrypt.compare(password, user?.password);
    if (result) {
        const payload = {
            email: user.email,
            id: user._id,
            role:user.role,
        };
        const token = await genrateJwtToken(payload);
        res.status(200).json({
            status:true,
            message: "login successfull",
            token: token,
            role:user.role
        });
    } else {
        res.status(400).json({ error: "user id and password is wrong" });
    }
})



module.exports = {  registerUser, login }