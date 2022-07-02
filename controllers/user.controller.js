const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// Crud =>

// C => Create

const postUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// R => Read

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// U => Update

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// D => Delete

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  postUser,
  getUser,
  updateUser,
  deleteUser,
};
