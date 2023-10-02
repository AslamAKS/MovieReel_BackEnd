const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  console.log('token is waiting for checking');
  console.log('this is token :'+token)
  if (!token) {
    console.log('no token')
    return res.json({ status: false })
    
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    console.log('token is verifiying.....');
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user){ 
        console.log('token verification success, user found, user id:'+user.username)
        return res.json({ status: true, user: user.username })
    }else return res.json({ status: false })
    }
  })
}