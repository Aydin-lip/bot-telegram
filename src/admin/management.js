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

module.exports = bot => {
  bot.hears("مدیریت", ctx => {
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

}