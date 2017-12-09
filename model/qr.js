const mongoose = require('mongoose');
let QRSchema = mongoose.Schema({
    name: String,
    sent: Boolean
});
let QR = mongoose.model('qr', QRSchema);
module.exports = QR;