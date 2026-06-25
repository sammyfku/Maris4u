const User = require('../models/User')
const generateToken = require('../utils/generateToken')

exports.register = async (req,res)=>{
  // stub
  res.json({ message: 'register endpoint' })
}

exports.login = async (req,res)=>{
  res.json({ message: 'login endpoint' })
}

exports.getMe = async (req,res)=>{
  res.json({ user: req.user })
}
