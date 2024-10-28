const mongoose = require('mongoose')
const dbSrc = 'mongodb://127.0.0.1:27017/taskdb'
mongoose.set('strictQuery', false)

async function db() {
  try {
    await mongoose.connect(dbSrc)
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error)
  }
}

module.exports = {db}