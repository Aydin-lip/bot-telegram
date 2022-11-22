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
  bot.hears("آگهی های ثبت شده", ctx => {
    let Call = callRegesteredAds(ctx)
    let adsID = []

    Call?.ads?.forEach(w => {
      adsID.push(`sendResume-${w.id}`)
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
            [{ text: "ارسال رزومه", callback_data: `sendResume-${w.id}` }]
          ]
        }
      })
    })

    bot.action(adsID, ctx => {
      if (complatedProf(ctx)) {
        ctx.answerCbQuery()
        ctx.reply(ctx.match.split("-")[1])
      } else {
        const message = `
شما پروفایل خود را کامل نکرده اید!
لطفا ابتدا پروفایل خود را تکمیل و سپس اقدام به اسال رزومه بنمایید :)
    `
        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "تکمیل پروفایل", callback_data: "complated-profile" }]
            ]
          }
        })
      }
    })
  })

  bot.action("complated-profile", ctx => {
    ctx.deleteMessage()
    const message = `
شما پروفایل خود را کامل نکرده اید!
لطفا ابتدا پروفایل خود را تکمیل و سپس اقدام به ثبت آگهی بنمایید :)
    `
    ctx.reply(message)
    editProfileHandler(ctx)
  })
}