import User from '../schemas/users.schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const user_signin = async (req, res, next) => {
  console.log(req.body)

  const { cnic, password } = req.body
  try {
    const existingUser = await User.findOne({ cnic });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(existingUser.password, password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: 'Invalid Credentails' });
    }
    const token = jwt.sign({ cnic: existingUser.cnic, id: existingUser._id }, 'testUser', { expiresIn: '1h' });
    res.status(200).json({ result: existingUser, token });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong! Please try again later' });
  }
}

export const user_signup = async (req, res, next) => {
  console.log(req.body)
  const {  name, lastname, cnic,password, cpassword } = req.body 
    try {
      console.log("try block ", req.body)
        const existingUser = await User.findOne({ cnic : cnic });
      console.log("existingUser ", existingUser)

        if (existingUser) {
          return res.status(400).json({ message: 'User already exist' });
        }
        if(password !== cpassword) {
      console.log("password ", existingUser)
          return res.status(400).json({ message: 'Passwords do not matched' });
        }
        const hashedPassword =  await bcrypt.hash(password, 12);
      console.log("hashedPassword ", hashedPassword)

        const result =  await User.create({ cnic, password: hashedPassword, firstname: name, lastname});
        console.log("result ", result)

        const token = jwt.sign({ cnic: result.cnic, id: result._id }, 'testUser', { expiresIn: '1h'});
        console.log("token ", token)
        
        res.status(200).json({ result, token });
        
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong! Please try again later' });
    }
}

