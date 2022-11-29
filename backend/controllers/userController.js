import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      username: user.username,
      hashed_password: user.hashed_password,
      display_name: user.display_name,
      role: user.role,
      token: jwt.sign({id: user._id}, '1234', { expiresIn: '30d' }),
    })
  } else {
    res.status(401)
    throw new Error('Invalid username or password')
  }
})

const register = asyncHandler(async (req, res) => {
  const { username, password, display_name, role } = req.body

  const userExists = await User.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    username,
    hashed_password: bcrypt.hashSync(password),
    display_name, 
    role
  })

  if (user) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      display_name: user.display_name,
      role: user.role,
      token: jwt.sign({id: user._id}, '1234', { expiresIn: '30d' }),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ ...req.query });
  res.json([...users]);
})

export { login, register, getUsers };