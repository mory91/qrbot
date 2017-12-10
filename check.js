import { forEach } from '../../.cache/typescript/2.6/node_modules/@types/async';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QR');

const Qr = require('./model/message')


let nums = {}
Qr.find({}, function(err, res) {
    for(let r in res) {
        nums[r.chatId] = 0 | (nums[r.chatId] + 1);
    }
    console.print(nums)
})