const router = require("express").Router();
const { signUp, signIn } = require("../controllers/auth/auth.controller");
const { check } = require("express-validator");

// Register User

// signUp
// http://localhost:8000/api/v1/auth/register
router.post(
  "/register",
  [
    check("email", "Email Is Not Valid").isEmail(),
    check("password", "Password Is Not Valid").isLength({ min: 6 }),
  ],
  signUp
);

// signIn
// http://localhost:8000/api/v1/auth/signInUser
router.post(
  "/signInUser",
  [
    check("email", "Email Is Not Valid").isEmail(),
    check("password", "Password Is Not Valid").isLength({ min: 6 }),
  ],
  signIn
);

module.exports = router;
