const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  feedback:[{
    selectedFile : { type: String },
    name:{ type: String },
    message:{ type: String },
    Grade:{ type: String },
  
}],
  id: { type: String },
});

module.exports = mongoose.model('User', userSchema);