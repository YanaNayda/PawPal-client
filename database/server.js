import express, { json } from 'express';
import mongoose from 'mongoose';
import connectDB from './db.js';
import { User } from './models/User.js';
import cors from 'cors';


const app = express();
 
// Подключение к MongoDB
connectDB();
app.use(cors());
app.use(json()); 
console.log('User model:', User);

app.post('/api/users', async (req, res) => {
  const { uid, email, displayName } = req.body;
  try {
    if (!uid || !email || !displayName) {
      return res.status(400).json({ error: 'UID, email, and displayName are required' });
    }
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    const user = new User({ uid, email, displayName });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(400).json({ error: 'Error creating user', details: error.message });
  }
});


app.get('/api/users/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Error fetching user', details: error.message });
  }
});



app.listen(3000, () => console.log('Server running on port 3000'));