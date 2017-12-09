
const token = '481116684:AAFjskw96161l-AAOAaKgDIuJ9wsrU7AjiA'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QR');

const Qr = require('./model/qr')
const Message = require('./model/message')

async function imread(path) {
    const jimp = require("jimp");
    const fs = require("fs");
    const https = require('https')
    let buffer = await new Promise(function(resolve, reject) {
        https.get(path, (res) => {
            let rawData = []
            let sizeData = 0
            res.on('data', (chunk) => {
                sizeData += chunk.length
                rawData.push(chunk)
            })
            res.on('end', () => {
                try {
                    rawData = Buffer.concat(rawData, sizeData)
                    resolve(rawData);
                } catch (e) {
                    reject(e);
                }
            });
        })
    })
    
    let res =  await new Promise(function(resolve, reject) {

        jimp.read(buffer, function(err, image) {
            if (err) {                
                reject(err)
            } else {
                resolve(image)
            }
        })
    })
    return res
}

async function getQr(path) {
    let image = await imread(path)
    let res = await new Promise(function(resolve, reject) {
        const QrCode = require('qrcode-reader');
        let qr = new QrCode();
        qr.callback = function(err, value) {
            if (err) {
                reject(err)
            }
            resolve(value.result);
        };
        qr.decode(image.bitmap);
    })
    return res
}

const Telegraf = require('telegraf')

const bot = new Telegraf(token)
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})

bot.on('photo', (ctx) => {
    let chatId = ctx.update.message.chat.id
    ctx.telegram.getFileLink(ctx.update.message.photo[ctx.update.message.photo.length - 1].file_id).then(file => {
        getQr(file).then(res => {
            console.log(res)
            Qr.findOne({name: res}, function(err, data) {
                if (err) {
                    console.log(err)
                } else if (data == null) {
                    ctx.reply('not found!')
                } else {
                    if (data.sent == false) {
                        data.sent = true
                        data.save()
                        let msg = new Message()
                        msg.name = res
                        msg.chatId = chatId
                        msg.save()
                        ctx.reply('OK!')
                    } else {
                        ctx.reply("Already Added :( !")
                    }
                }
            })
        })
    })
})

bot.startPolling()