require("dotenv").config()
const fs = require("fs")

module.exports = bot => {
  bot.hears(["کانال ما", "/channel"], ctx => {
    let channelMessage = fs.readFileSync("./data/config.json")
    let messageData = JSON.parse(channelMessage)
    ctx.reply(messageData[2].channel_message)
  })
}