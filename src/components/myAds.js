const [callUserProfile, callRegesteredAds, complatedProf, registeredNewAd, editProfileHandler] = require("./config")

module.exports = bot => {
  bot.hears("آگهی های من", ctx => {
    const Call = callRegesteredAds(ctx)
    if (Call.myAds.length > 0) {
      Call.myAds.forEach(w => {
        ctx.reply(`
نام شرکت:   ${w.company}
دسته بندی شغلی:   ${w.category}
محارت های مورد نیاز:   ${w.skills}
استان:   ${w.location}
نوع قرارداد:   ${w.jobType}
سابقه کار:   ${w.workExperience}
حداقل حقوق:   ${w.salary}

${w.description}`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "ویرایش", callback_data: `edit-${w.id}` }]
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
  })
  bot.action("Register-new-ad", ctx => {
    ctx.deleteMessage()
    registeredNewAd(ctx)
  })
}