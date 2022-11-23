const [
  menuKey,
  admin,
  cancleUserInfo] = require("./config")

module.exports = bot => {
  bot.hears("بازگشت", ctx => {
    if (admin(ctx)) {
      cancleUserInfo(true, false)
      ctx.reply("شما به منوی مدیریت بازگشتید.", {
        reply_markup: menuKey()
      })
    }
  })
}