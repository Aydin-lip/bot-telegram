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
  cancleEditAd] = require("../config")
const editProfile = require("./editProfile")

module.exports = bot => {
  let profile = {}
  bot.hears(["پروفایل", "/profile"], ctx => {
    editProfileHandler(ctx)
  })
  bot.action("get-resume", ctx => {
    profile = callUserProfile(ctx)
    bot.telegram.sendDocument(ctx.chat.id, profile?.resume)
  })
  editProfile(bot)
}