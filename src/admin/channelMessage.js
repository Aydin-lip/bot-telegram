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
  changeChannelMessage] = require("./config")
const fs = require("fs")

module.exports = bot => {
  let channelMessage = fs.readFileSync("./data/config.json")
  let messageData = JSON.parse(channelMessage)

  bot.hears("تغییر پیام (کانال ما)", ctx => {
    if (admin(ctx)) {
      ctx.reply(messageData[2].channel_message)
      setTimeout(() => {
        ctx.reply("لطفا پیام مدنطر خود را برای قسمت (کانال ما) ارسال کنید", {
          reply_markup: {
            keyboard: [
              [{text: "بازگشت"}]
            ],
            reply_to_message_id: ctx.message.message_id + 1
          }
        })
        changeChannelMessage(true, true)
      }, 500);
    }
  })

  bot.on("message", (ctx, next) => {
    if (changeChannelMessage(false)) {
      messageData[2].channel_message = ctx.message.text
      fs.writeFileSync("./data/config.json", JSON.stringify(messageData))
      ctx.reply("تغییرات با موفقیت ذخیره شد.", {
        reply_markup: menuKey()
      })
      changeChannelMessage(true, false)
    }
    next(ctx)
  })

}