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
  cancleEditAd] = require("../components/config")

module.exports = bot => {
  bot.hears("بازگشت به صفحه اصلی", ctx => {
    ctx.reply("شما به صفحه اصلی بازگشتید.", {
      reply_markup: menuKey(ctx)
    })
  })
}