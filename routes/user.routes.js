const router = require("express").Router();
const {
  postUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { check } = require("express-validator");

// Post
// https:localhost:8000/api/v1/user/newUser
router.post(
  "/newUser",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is not valid").isLength({ min: 6 }),
  ],
  postUser
);

// Get
// https:localhost:8000/api/v1/user
router.get("/", getUser);

// Update
// https:localhost:8000/api/v1/
router.put("/:id", updateUser);

// Delete
// https:localhost:8000/api/v1/
router.delete(":id", deleteUser);

module.exports = router;
