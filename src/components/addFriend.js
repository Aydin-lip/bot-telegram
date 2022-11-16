require("dotenv").config()
const userBot = "Ojfsvbsowbot"

module.exports = bot => {
  bot.hears("دعوت دوستان", ctx => {
    let message = `
شما با ارسال این لینک به دوستان خود میتوانید آنها را به ربات دعوت کنید :)
`
    ctx.reply(`https://t.me/${userBot}?start=${ctx.chat.id}`)
    setTimeout(() => {
      ctx.reply(message, {
        reply_to_message_id: ctx.message.message_id + 1
      })
    }, 2000);
  })
}