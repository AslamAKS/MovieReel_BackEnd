const {Signup,Login} = require('../Controllers/AuthControl')
const router = require("express").Router();
const { userVerification } = require('../Middlewares/AuthMiddleware')

router.post('/', userVerification);
router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;