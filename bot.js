require("dotenv").config()
const Telegraf = require("telegraf")
const bot = new Telegraf(process.env.TOKEN)



const start = require("./src/components/start")
start(bot)

const cancel = require("./src/components/cancel")
cancel(bot)

const registeredAds = require("./src/components/registeredAds")
registeredAds(bot)

const registerAd = require("./src/components/registerAd")
registerAd(bot)

const profile = require("./src/components/profile")
profile(bot)

const myAds = require("./src/components/myAds")
myAds(bot)

const editProfile = require("./src/components/editProfile")
editProfile(bot)




// bot.on("message", ctx => {
//   bot.telegram.forwardMessage(-1001369097830, ctx.chat.id, ctx.message.message_id)

//   ctx.reply("send")
// })


bot.launch()