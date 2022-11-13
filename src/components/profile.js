const [callUserProfile, callRegesteredAds, complatedProf, registeredNewAd, editProfileHandler] = require("./config")

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