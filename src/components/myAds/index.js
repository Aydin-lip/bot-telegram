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

module.exports = bot => {
  bot.hears("آگهی های من", (ctx, next) => {
    const Call = callRegesteredAds(ctx)
    let myAdsID = []

    if (Call.myAds.length > 0) {
      Call.myAds.forEach(w => {
        myAdsID.push(`edit-${w.id}`)
        ctx.reply(`
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