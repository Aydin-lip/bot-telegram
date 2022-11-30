module.exports = bot => {
  const start = require("./start")
  start(bot)
  
  const cancel = require("./cancel")
  cancel(bot)
  
  const registeredAds = require("./registeredAds")
  registeredAds(bot)
  
  const registerAd = require("./registerAd")
  registerAd(bot)
  
  const profile = require("./profile")
  profile(bot)
  
  const myAds = require("./myAds")
  myAds(bot)
  
  const addFriend = require("./addFriend")
  addFriend(bot)
  
  const channel = require("./channel")
  channel(bot)
  
  const aboutUS = require("./aboutUS")
  aboutUS(bot)
  
  const support = require("./support")
  support(bot)

  const help = require("./help")
  help(bot)
}