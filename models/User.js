const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    birthday: {
        type: Date
    }

});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);