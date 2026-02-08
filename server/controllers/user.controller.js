const User = require("../repository/user.schema");
const { genrateJwtToken, encryptPassword, } = require("../config/SecurityConfig");
const asyncErrorHandler = require("../config/GlobalExceptionHandler");

const createUser = asyncErrorHandler(async (req, res) => {
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
    const savedUser = await User.create(user);
    res.status(200).json({
        status:true,
        message: "user is successfully registered",
    });
})


const assignedRoleToUser=asyncErrorHandler(async (req,res)=>{
    let { role,id } = req.body;
    if(!id){
        res.status(400).json({
        status:false,
        message: "id is required",
    })
    return;
  }
    if(!role){
        res.status(400).json({
        status:false,
        message: "role is required",
    })
        return;
    }
     
   
    role=role.toUpperCase();
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {role:role},
        { new: true }
    );

    res.status(200).json({
        status:true,
        message: " role assigned",
    });
});


const getUsers=asyncErrorHandler(async (req,res)=>{
    const users = await User.find(
        { role: { $ne: "ADMIN" } }   // exclude ADMIN users
    ).select("-password"); 
    res.status(200).json({
        status:true,
        message: "user fetched success",
        data:users
    });
});



module.exports = {  createUser,assignedRoleToUser,getUsers }