const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QR');

const Qr = require('./model/qr')
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('names.txt')
});

lineReader.on('line', function (line) {
    let q = new Qr();
    q.name = line;
    q.sent = false;
    q.save()
});