require("dotenv").config()
const [
  menuKey,
  callUserProfile,
  callRegesteredAds,
  callRegesteredAdsCount,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd,
  cancleEditAd,
  cancleReportAd,
  support] = require("../config")
const fs = require("fs")
const replyMessage = require("./replyMessage")

module.exports = bot => {
  bot.hears(["پشتیبانی", "/support"], ctx => {
    ctx.reply("لطفا برای ارتباط با پشتیبانی پیام خود را ارسال نمایید...", {
      reply_markup: {
        keyboard: [
          [{ text: "انصراف" }]
        ]
      }
    })
    support(true, true)
  })

  bot.on("message", (ctx, next) => {
    if (support(false)) {
      let admin = process.env.ADMIN
      let message = `
${ctx.message.text}

id:   ${ctx.chat.id}
`
      bot.telegram.sendMessage(admin, message, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "پاسخ دادن", callback_data: `reply-message-user-${ctx.chat.id}` }]
          ]
        }
      }).then(res => { }).catch(rej => { })
      ctx.reply("پیام شما با موفقیت به پشتیبانی ارسال شد.", {
        reply_markup: menuKey(ctx)
      })
      support(true, false)
    }
    next(ctx)
  })

  replyMessage(bot)

}