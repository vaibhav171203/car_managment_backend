const express = require("express");
const { signup, login,registerUser} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
