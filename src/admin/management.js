require("dotenv").config()

const backHomePage = require("./backHomePage")

module.exports = bot => {
  bot.hears("مدیریت", ctx => {
    let admins = process.env.ADMINS.split(",")
    if (admins.includes(String(ctx.chat.id))) {
      ctx.reply("ok", {
        reply_markup: {
          keyboard: [
            [{ text: "کاربر های ربات" }, {text: "اطلاعات دقیق کاربر مورد نظر"}],
            [{text: "آگهی های ثبت شده"}, {text: "آگهی های گزارش شده"}, {text: "آگهی های مسدود شده"}],
            [{text: "ارسال پیام به تمام کاربرها"}, {text: "ارسال پیام به کاربر مورد نظر"}],
            [{text: "ادمین های ربات"}, {text: "اضافه کردن ادمین جدید"}],
            [{text: "تغییر پیام (کانال ما)"}, {text: "اضافه کردن کانال"}],
            [{text: "تغییر پیام (درباره ما)"}],
            [{text: "بازگشت به صفحه اصلی"}]
          ]
        }
      })
    } else {
      ctx.reply("شما به این بخش دسترسی ندارید")
    }
  })

  backHomePage(bot)

}