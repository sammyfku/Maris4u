const mongoose = require('mongoose')

module.exports = async function connectDB(){
  const uri = process.env.DB_URI || 'mongodb://localhost:27017/maris4u'
  try{
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  }catch(err){
    console.error('DB connection error', err.message)
    process.exit(1)
  }
}
