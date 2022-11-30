require("dotenv").config()

module.exports = bot => {
  bot.hears(["دعوت دوستان", "/invite"], ctx => {
    let message = `
شما با ارسال این لینک به دوستان خود میتوانید آنها را به ربات دعوت کنید :)
`
    ctx.reply(`https://t.me/${process.env.USERBOT}?start=${ctx.chat.id}`)
    setTimeout(() => {
      ctx.reply(message, {
        reply_to_message_id: ctx.message.message_id + 1
      })
    }, 2000);
  })
}