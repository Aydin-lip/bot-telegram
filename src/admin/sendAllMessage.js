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
const fs = require("fs")

module.exports = bot => {
  bot.hears("ارسال پیام به تمام کاربرها", ctx => {
    if (admin(ctx)) {
      sendAllMess(true, true)
      ctx.reply("لطفا پیام خود را ارسال کنید.", {
        reply_markup: {
          keyboard: [
            [{ text: "بازگشت" }]
          ]
        }
      })
    }
  })

  bot.on("message", (ctx, next) => {
    if (sendAllMess(false)) {
      let send = 0

      let users = fs.readFileSync("./data/users.json")
      let usersData = JSON.parse(users)
      usersData.forEach(u => {
        bot.telegram.forwardMessage(u, ctx.chat.id, ctx.message.message_id).then(res => {
          send += 1
          console.log("send")
        }).catch(rej => { })
      })
      setTimeout(() => {
        ctx.reply(`پیام شما از ${usersData.length} کاربر به ${send} کاربر ارسال شد.`, {
          reply_markup: menuKey()
        })
      }, 1000);
      sendAllMess(true, false)
    }
    next(ctx)
  })

}