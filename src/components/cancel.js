const [
  callUserProfile,
  callRegesteredAds,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd] = require("./config")

module.exports = bot => {
  bot.hears("انصراف", ctx => {
    cancleEditProfile(true, "All", false, 0, 0)
    cancleRegisterNewAd(true, "All", false, 0)
    const messagee = `
شما به منوی اصلی ربات برگشتید.
لطفا یکی از گزینه های زیر را انتخاب کنید
  `
    ctx.reply(messagee, {
      reply_markup: {
        keyboard: [
          [{ text: "آگهی های ثبت شده" }],
          [{ text: "ثبت آگهی جدید" }, { text: "آگهی های من" }],
          [{ text: "پروفایل" }, { text: "دعوت دوستان" }],
          [{ text: "درباره ما" }, { text: "کانال ما" }]
        ],
        resize_keyboard: true
      }
    })
  })
}