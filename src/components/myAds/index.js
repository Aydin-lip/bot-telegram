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
const editAd = require("./editAd")
const fs = require("fs")

module.exports = bot => {
  bot.hears("آگهی های من", (ctx, next) => {
    const Call = callRegesteredAds(ctx)
    let myAdsID = []
    let reportAds = fs.readFileSync("./data/config.json")
    let reportAdaData = JSON.parse(reportAds)
    let reportCountAds = reportAdaData[4].reports_ads.map(r => r.count_ad)

    if (Call.myAds.length > 0) {
      Call.myAds.forEach(w => {
        let report = false
        if (reportCountAds.includes(w.count)) {
          let rep = reportAdaData[4].reports_ads.filter(r => r.count_ad == w.count)[0]
          if (rep.confirmed) {
            report = true
          }
        }
        myAdsID.push(`edit-${w.id}`)
        ctx.reply(`
${report ? "📛 این آگهی مسدود شده 📛" : ""}

نام شرکت:   ${w.company}
دسته بندی شغلی:   ${w.category}
مهارت های مورد نیاز:   ${w.skills}
استان:   ${w.location}
نوع قرارداد:   ${w.jobType}
سابقه کار:   ${w.workExperience}
حداقل حقوق:   ${w.salary}

${w.description}`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "ویرایش", callback_data: `edit-${w.count}` }]
            ]
          }
        })
      })
    } else {
      const message = `
  شما هیچ آگهی ثبت شده ای ندارید!
      `
      ctx.reply(message, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "ثبت آگهی جدید", callback_data: "Register-new-ad" }]
          ]
        }
      })
    }
    next(ctx)
  })
  bot.action("Register-new-ad", ctx => {
    ctx.deleteMessage()
    registeredNewAd(ctx)
  })
  editAd(bot)
}