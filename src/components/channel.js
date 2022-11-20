require("dotenv").config()

module.exports = bot => {
  bot.hears("کانال ما", ctx => {
    if (process.env.CHANNEL) {
      ctx.reply(`
ما در این کانال آگهی های شما و بروزرسانی های ربات رو اطلاع رسانی میکنیم.
${process.env.CHANNEL}
`)
    } else {
      ctx.reply("درحال حاضر این ربات فاقد کانال میباشد.")
    }
  })
}