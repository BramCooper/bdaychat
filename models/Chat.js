const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    text: {
        type: String
    },
    username: {
        type: String
    }

});
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;