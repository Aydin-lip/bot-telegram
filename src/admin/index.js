require("dotenv").config()
const [
  menuKey,
  admin,
  cancleUserInfo] = require("./config")

const backHomePage = require("./backHomePage")
const users = require("./users")
const userInfo = require("./userInfo")
const back = require("./back")
const registeredAds = require("./registeredAds")
const sendAllMessage = require("./sendAllMessage")
const sendMessageUser = require("./sendMessageUser")
const adminsList = require("./adminsList")
const addAdmin = require("./addAdmin")
const channelMessage = require("./channelMessage")
const channel = require("./channel")
const aboutUS = require("./aboutUS")
const reportedAds = require("./reportedAds")
const blockedAds = require("./blockedAds")
const replyMessage = require("./replyMessage")

module.exports = bot => {
  bot.hears(["مدیریت", "/admin"], ctx => {
    if (admin(ctx)) {
      ctx.reply("شما وارد بخش مدیریت ربات شدید.", {
        reply_markup: menuKey()
      })
    }
  })

  backHomePage(bot)
  back(bot)
  
  users(bot)
  userInfo(bot)
  registeredAds(bot)
  reportedAds(bot)
  blockedAds(bot)
  sendAllMessage(bot)
  sendMessageUser(bot)
  adminsList(bot)
  addAdmin(bot)
  channelMessage(bot)
  channel(bot)
  aboutUS(bot)
  replyMessage(bot)
}