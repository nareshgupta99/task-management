const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt=require("bcrypt");

dotenv.config();

let decodedToken=""
const genrateJwtToken = async (payload) => {

    const expiry = process.env.EXPIRY_TIME;
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: expiry });
    console.log(token);
    return token;
}


function verifyToken(token) {
    token = token.split('Bearer')[1].trim();
    const secret = process.env.SECRET;
    var decoded = jwt.verify(token, secret);
    return decoded;
}





// function to hash a password

const encryptPassword = async function (password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}




  function getDecodedToken(){
    return decodedToken;
  }
  



module.exports = { genrateJwtToken, verifyToken, encryptPassword,getDecodedToken }