const Auth = require("../../models/auth.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const availableUser = await Auth.findOne({ email });
    if (availableUser) {
      return res.status(442).json({ message: "Already User Exists" });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const user = new Auth({
      username,
      email,
      password: hashedPassword,
    });

    const result = await user.save();

    const token = JWT.sign(
      { email: result.email },
      process.env.SECRET_TOKEN_SIGN
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


const signIn = async (req,res)=>{
    const {password ,email} = req.body

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     try {
        const availableUser = Auth.findOne({email})
        if(!availableUser){
            return res.status(404).json({message: "User Not Found :("})
        }
     } catch (error) {
        res.status(500).json(error.message)
     }
}


module.exports = {
  signUp,
};
