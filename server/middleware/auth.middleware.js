const jwt = require("jsonwebtoken");
const User = require("../repository/user.schema");

async function isAuthenticated(req, res,next) {
    try{
  
      let token = req.headers.authorization;
  
      // check for token is empty or not
      if (!token) {
        res.status(401).json({
          status:false,
          message: "jwt token is not valid"
        })
      }
     decodedToken = verifyToken(token);
      let {exp}=decodedToken;
      if(Date.now() < exp){
        res.status(401).json({
          status:false,
          message:"Session Time Out Login Again To Continue"
        })
      }
      next();
    }catch(err){
        console.log(err);
        res.status(500).json({
          status:false,
            message:"internal server error"
        })
    }
}

const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {

      let token = req.headers.authorization;
      const decodeToken = decodedToken = verifyToken(token);
      const {id} = decodeToken;
       const user = await  User.findById(id)

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
              status:false,
              message: "you are not authorised" });
        }
        next();
    };
};


function verifyToken(token) {
    token = token.split('Bearer')[1].trim();
    const secret = process.env.SECRET;
    var decoded = jwt.verify(token, secret);
    return decoded;
}




module.exports={isAuthenticated,authorizeRoles,verifyToken}