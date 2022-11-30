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
  aboutUs,
  replyMessage] = require("./config")
const fs = require("fs")

module.exports = bot => {
  let users = fs.readFileSync("./data/users.json")
  let usersData = JSON.parse(users)
  let replyUsers = usersData.map(u => `reply-message-user-${u}`)
  let match = 0
  bot.action(replyUsers, ctx => {
    if (admin(ctx)) {
      match = ctx.match.split("-")[3]
      ctx.reply("لطفا پیام خود را ارسال کنید...", {
        reply_markup: {
          keyboard: [
            [{ text: "بازگشت" }]
          ]
        }
      })
      replyMessage(true, true)
    }
  })

  bot.on("message", (ctx, next) => {
    if (replyMessage(false)) {
      bot.telegram.sendMessage(match, ctx.message.text, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "پاسخ", callback_data: `reply-message-admin` }]
          ]
        }
      }).then(res => { }).catch(rej => { })
      ctx.reply("پیام شما با موفقیت ارسال شد.", {
        reply_markup: menuKey(ctx)
      })
      replyMessage(true, false)
    }
    next(ctx)
  })

}