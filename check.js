
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QR');

const Qr = require('./model/message')


let nums = {}
Qr.find({}, function(err, res) {
    for(let r in res) {
        if (!nums[r.chatId])
            nums[r.chatId] = 0
        nums[r.chatId] = (nums[r.chatId] + 1);
    }
    console.log(nums)
})