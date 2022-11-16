const [
  callUserProfile,
  callRegesteredAds,
  callRegesteredAdsCount,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd] = require("./config")

module.exports = bot => {
  let profile = {}
  bot.hears("پروفایل", ctx => {
    editProfileHandler(ctx)
  })
  bot.action("get-resume", ctx => {
    profile = callUserProfile(ctx)
    bot.telegram.sendDocument(ctx.chat.id, profile?.resume)
  })
}