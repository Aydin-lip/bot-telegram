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
  aboutUs] = require("./config")
const fs = require("fs")

module.exports = bot => {
  let aboutText = fs.readFileSync("./data/config.json")
  let aboutTextData = JSON.parse(aboutText)
  bot.hears("تغییر پیام (درباره ما)", ctx => {
    if (admin(ctx)) {
      ctx.reply(aboutTextData[3].about_message)
      ctx.reply("لطفا پیام خود را ارسال کنید.", {
        reply_markup: {
          keyboard: [
            [{ text: "بازگشت" }]
          ],
        }
      })
      aboutUs(true, true)
    }
  })

  bot.on("message", (ctx, next) => {
    if (aboutUs(false)) {
      aboutTextData[3].about_message = ctx.message.text
      fs.writeFileSync("./data/config.json", JSON.stringify(aboutTextData))
      aboutUs(true, false)
      ctx.reply("پیام (درباره ما) با موفقیت تغییر یافت.", {
        reply_markup: menuKey()
      })
    }
  })

}