import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

router.post('/register', async (req,res) => {
    const { name, email, password, college_id } = req.body;
    try{
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: 'User already exists'})
        }
        const user = await User.create({
            name,
            email,
            password,
            college_id
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            college_id: user.college_id,
            token: generateToken(user._id)
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
      
        try {
          // Check for user email
          const user = await User.findOne({ email });
      
          if (user && (await user.matchPassword(password))) {
            res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              college_id: user.college_id,
              token: generateToken(user._id),
            });
          } else {
            res.status(401).json({ message: 'Invalid email or password' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
      });

      router.get('/profile', protect, async (req, res) => {
        try {
          const user = await User.findById(req.user._id).select('-password');
          
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
      });

    export default router;