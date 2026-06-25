const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async function authMiddleware(req,res,next){
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if(!token) return res.status(401).json({ message: 'Not authorized' })
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  }catch(err){
    res.status(401).json({ message: 'Token invalid' })
  }
}
