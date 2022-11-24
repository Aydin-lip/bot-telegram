const [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser,
  callRegesteredAds,
  callProfileUser,
  countAds,
  cancleEditAdUser,
  sendAllMess,
  sendUserMess] = require("./config")

module.exports = bot => {
  bot.hears("بازگشت", ctx => {
    if (admin(ctx)) {
      cancleUserInfo(true, false)
      cancleEditUser(true, "All", false, 0)
      cancleEditAdUser(true, "All", false, 0)
      sendAllMess(true, false)
      sendUserMess(true, "All", false, 0)
      
      ctx.reply("شما به منوی مدیریت بازگشتید.", {
        reply_markup: menuKey()
      })
    }
  })
}