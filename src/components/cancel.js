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
  cancleReportAd] = require("./config")

module.exports = bot => {
  bot.hears("انصراف", ctx => {
    cancleEditProfile(true, "All", false, 0, 0)
    cancleRegisterNewAd(true, "All", false, 0)
    cancleEditAd(true, "All", false, 0)
    cancleReportAd(true, false)

    const messagee = `
شما به منوی اصلی ربات برگشتید.
لطفا یکی از گزینه های زیر را انتخاب کنید
  `
    ctx.reply(messagee, {
      reply_markup: menuKey(ctx)
    })
  })
}