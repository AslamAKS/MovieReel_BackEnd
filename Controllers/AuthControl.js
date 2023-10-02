const User = require("../Models/UserModel");
const { createSecretToken } = require("../Util/Token");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User Already Exists" });
    }
    const user = await User.create({ name, email, password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201)
      .json({ message: "Registration Success, Please LOGIN", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'This Email Is Not Registered' })
    }
    const pass_auth = await bcrypt.compare(password, user.password)
    if (!pass_auth) {
      return res.json({ message: 'Incorrect Password' })
    }
    const token = createSecretToken(user._id);
    console.log('create token at login and below the token');
    console.log(token)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "Login Success", token:token, success: true });
    next()
  } catch (error) {
    console.error(error);
  }
}