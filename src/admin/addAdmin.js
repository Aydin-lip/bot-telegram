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
  addAdmin] = require("./config")
const fs = require("fs")
require("dotenv").config()

module.exports = bot => {
  bot.hears("اضافه کردن ادمین جدید", ctx => {
    if (admin(ctx)) {
      ctx.reply("لطفا آیدی عددی کاربری را ارسال کنید", {
        reply_markup: {
          keyboard: [
            [{ text: "بازگشت" }]
          ]
        }
      })
      addAdmin(true, true)
    }
  })

  bot.on("message", (ctx, next) => {
    if (addAdmin(false)) {
      let admins = fs.readFileSync("./data/config.json")
      let adminsData = JSON.parse(admins)
      adminsData[0].admins.push(Number(ctx.message.text))
      fs.writeFileSync("./data/config.json", JSON.stringify(adminsData))
      
      ctx.reply(`کاربر ${ctx.message.text} با موفقیت به لیست ادمین های ربات اضافه شد.`, {
        reply_markup: menuKey()
      })
      addAdmin(true, false)
    }
    next(ctx)
  })

}