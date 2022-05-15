const mongoose = require('mongoose')

var scoreSchema = mongoose.Schema({
  idUser: String,
  score: Number,
  });
  
  const Score = mongoose.model('Score',scoreSchema);

  module.exports = Score