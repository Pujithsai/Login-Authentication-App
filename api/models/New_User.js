const mongoose = require('mongoose');

const New_User = mongoose.model("New_User", new mongoose.Schema({
    email: {type:String, unique:true},
    password: {type:String},
}));

module.exports = New_User;