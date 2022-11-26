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
  sendUserMess,
  addAdmin,
  changeChannelMessage,
  changeChannel,
  aboutUs]= require("./config")

module.exports = bot => {
  bot.hears("بازگشت", ctx => {
    if (admin(ctx)) {
      cancleUserInfo(true, false)
      cancleEditUser(true, "All", false, 0)
      cancleEditAdUser(true, "All", false, 0)
      sendAllMess(true, false)
      sendUserMess(true, "All", false, 0)
      addAdmin(true, false)
      changeChannelMessage(true, false)
      changeChannel(true, false)
      aboutUs(true, false)
      
      ctx.reply("شما به منوی مدیریت بازگشتید.", {
        reply_markup: menuKey()
      })
    }
  })
}