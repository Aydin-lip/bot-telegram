const fs = require("fs")
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
  cancleEditAd] = require("./config")

module.exports = (bot) => {
  bot.start(ctx => {
    let read = fs.readFileSync("./data/users.json")
    let data = JSON.parse(read)
    let hast = false
    if (data.length > 0) {
      data.filter(u => {
        if (u == ctx.chat.id) {
          hast = true
        }
      })
    }
    if (!hast) {
      let profile = { id: ctx.chat.id, from: 0, nameuser: `${ctx.chat.first_name ? ctx.chat.first_name : ""} ${ctx.chat.last_name ? last_name : ""}` , username: ctx.chat.username ? ctx.chat.username : "", firstname: ctx.chat.first_name, lastname: ctx.chat.last_name ? ctx.chat.last_name : "", phone: "", address: "", email: "", jobPosition: "", resume: "" }
      if (ctx.message.text.split(" ").length == 2) {
        profile.from = ctx.message.text.split(" ")[1]
      }
      let profiles = fs.readFileSync("./data/profiles.json")
      let profilesData = JSON.parse(profiles)
      profilesData.push(profile)
      fs.writeFileSync("./data/profiles.json", JSON.stringify(profilesData))

      let user = ctx.chat.id
      data.push(user)
      fs.writeFileSync("./data/users.json", JSON.stringify(data))
    }

    const message = `
سلام ${ctx.chat.first_name} 🖐️
به ربات پیدا کردن شغل خوش آمدید.
اگر دنبال شغل مناسب هستید با استفاده از این ربات میتوانید پیدا کنید 
و اگر دارایه بیزینس یا شرکتی هستید میتوانید با ثبت آگهی استخدام نیروی های مد نظر خود را جذب کنید.
`
    ctx.reply(message, {
      reply_markup: menuKey(ctx)
    })
  })
}