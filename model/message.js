const mongoose = require('mongoose');
let messageSchema = mongoose.Schema({
    chatId: String,
    name: String
});
let message = mongoose.model('Message', messageSchema);
module.exports = message;