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

const editProfile = require("./src/components/editProfile")
editProfile(bot)

const myAds = require("./src/components/myAds")
myAds(bot)

const editAd = require("./src/components/editAd")
editAd(bot)

const addFriend = require("./src/components/addFriend")
addFriend(bot)

const channel = require("./src/components/channel")
channel(bot)

const aboutUS = require("./src/components/aboutUS")
aboutUS(bot)

const management = require("./src/admin/management")
management(bot )



bot.launch()