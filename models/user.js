//modules - A set of functions you want to include in your application
//Use the exports keyword to make properties and methods available outside the module file
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  //function genSalt(rounds: number, callback: (err: Error, salt: string)
  //Asynchronously generates a salt.
  //rounds — Number of rounds to use, defaults to 10 if omitted
  //callback — Callback receiving the error, if any, and the resulting salt
  bcrypt.genSalt(10, (err, salt)=>{
    //function hash(s: string, salt: string | number, callback?: (err: Error, hash: string)
    //Asynchronously generates a hash for the given string.
    //@param s — String to hash
    //@param salt — Salt length to generate or salt to use
    bcrypt.hash(newUser.password/*s*/, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  //function compare(s: string, hash: string, callback?: (err: Error, success: boolean)
  //Asynchronously compares the given data against the given hash.
  //@param s — Data to compare
  //@param hash — Data to be compared to
  bcrypt.compare(candidatePassword/*s*/, hash, (err, isMatch/*success*/) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
