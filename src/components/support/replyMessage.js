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
  support,
  replyMessage] = require("../config")
const fs = require("fs")

module.exports = bot => {
  let admin = process.env.ADMIN
  bot.action(`reply-message-admin`, ctx => {
    ctx.deleteMessage()
    ctx.reply("لطفا پیام خود را ارسال کنید...", {
      reply_markup: {
        keyboard: [
          [{ text: "انصراف" }]
        ]
      }
    })
    replyMessage(true, true)
  })

  bot.on("message", (ctx, next) => {
    if (replyMessage(false)) {
      let message = `
${ctx.message.text}

id:   ${ctx.chat.id}
`
      bot.telegram.sendMessage(admin, message, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "پاسخ", callback_data: `reply-message-user-${ctx.chat.id}` }]
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