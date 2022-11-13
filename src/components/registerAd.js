const [callUserProfile, callRegesteredAds, complatedProf, registeredNewAd, editProfileHandler] = require("./config")

module.exports = bot => {
  bot.hears("ثبت آگهی جدید", ctx => {
    registeredNewAd(ctx)
  })
}