const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: String,
  mail: String,
  password: String,
  });
  
  const User = mongoose.model('Users',userSchema);

  module.exports = User