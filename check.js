
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QR');

const Qr = require('./model/message')


let nums = {}
Qr.find({}, function(err, res) {
    for (let i = 0; i < res.length; i++) {
        if (nums[res[i].chatId])
            nums[res[i].chatId] = 0;    
        nums[res[i].chatId] ++
    }
    console.log(nums)
})