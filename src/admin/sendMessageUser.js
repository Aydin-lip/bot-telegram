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
  bot.hears("ارسال پیام به کاربر مورد نظر", ctx => {
    if (admin(ctx)) {
      sendUserMess(true, "All", true, 1)
      ctx.reply("لطفا آیدی عددی کاربری که میخواید پیام ارسال بشه رو وارد کنید.", {
        reply_markup: {
          keyboard: [
            [{ text: "بازگشت" }]
          ]
        }
      })
    }
  })

  bot.on("message", (ctx, next) => {
    let { sendUserMessage, stepUserMessage } = sendUserMess(false, "All")
    if (sendUserMessage) {

      switch (stepUserMessage) {
        case 1:
          let has = false
          let users = fs.readFileSync("./data/users.json")
          let usersData = JSON.parse(users)
          usersData.filter(u => {
            if (u == ctx.message.text) {
              has = true
            }
          })
          setTimeout(() => {
            if (has) {
              ctx.reply("لطفا پیام خود را ارسال کنید.")
              sendUserMess(true, "All", true, 2)
            } else {
              ctx.reply("کاربر مورد نظر عضو ربات نیست.")
            }
          }, 1000);
          break;
        case 2:
          bot.telegram.forwardMessage(Number(ctx.message.text), ctx.chat.id, ctx.message.message_id).then(res => {
            ctx.reply(`پیام شما به آیدی ${ctx.message.text} ارسال شد.`, {
              reply_markup: menuKey()
            })
          }).catch(rej => {
            ctx.reply("پیام شما ارسال نشد.", {
              reply_markup: menuKey()
            })
          })
          sendUserMess(true, "All", false, 0)
          break;

        default:
          break;
      }
    }
    next(ctx)
  })

}