require("dotenv").config()
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
  cancleEditAd,
  cancleReportAd] = require("./config")
const fs = require("fs")

module.exports = (bot) => {
  let Call = callRegesteredAds()
  let sendResume = []
  let reportAd = []
  Call?.ads?.forEach(w => {
    sendResume.push(`sendResume-${w.count}`)
    reportAd.push(`report-ad-${w.count}`)
  })

  bot.hears(["آگهی های ثبت شده", "/registeredads"], ctx => {
    let reportAds = fs.readFileSync("./data/config.json")
    let reportAdaData = JSON.parse(reportAds)
    let reportCountAds = reportAdaData[4].reports_ads.map(r => r.count_ad)
    Call?.ads?.forEach(w => {
      if (reportCountAds.includes(w.count)) {
        let rep = reportAdaData[4].reports_ads.filter(r => r.count_ad == w.count)[0]
        if (!rep?.confirmed) {
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
                [{ text: "ارسال رزومه", callback_data: `sendResume-${w.count}` }],
                [{ text: "گزارش آگهی", callback_data: `report-ad-${w.count}` }]
              ]
            }
          })
        }
      } else {
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
              [{ text: "ارسال رزومه", callback_data: `sendResume-${w.count}` }],
              [{ text: "گزارش آگهی", callback_data: `report-ad-${w.count}` }]
            ]
          }
        })
      }
    })
  })

  bot.action(sendResume, ctx => {
    if (complatedProf(ctx)) {
      ctx.answerCbQuery()
      let adData = Call?.ads?.filter(a => a.count == ctx.match.split("-")[1])[0]
      let profile = callUserProfile(ctx)
      let message = `
        رزومه زیر برای این آگهی شما ارسال شد.

نام شرکت:   ${adData?.company}
دسته بندی شغلی:   ${adData?.category}
مهارت های مورد نیاز:   ${adData?.skills}
استان:   ${adData?.location}
نوع قرارداد:   ${adData?.jobType}
سابقه کار:   ${adData?.workExperience}
حداقل حقوق:   ${adData?.salary}

${adData?.description}`

      bot.telegram.sendMessage(adData?.id, message).then(res => { }).catch(rej => { })
      bot.telegram.sendDocument(adData?.id, profile?.resume).then(res => {
        ctx.reply("رزومه شما با موفقیت به آگهی مورد نظر ارسال شد.")
      }).catch(rej => {
        ctx.reply("مشکلی در ارسال رزومه پیش آمده!")
      })
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

  let countRep = 0
  bot.action(reportAd, ctx => {
    ctx.deleteMessage()
    let match = ctx.match.split("-")[2]
    let adData = Call?.ads?.filter(a => a.count == match)[0]
    countRep = Number(match)
    let message = `
    لطفا دلیل خود را برای گزارش این آگهی ارسال کنید

نام شرکت:   ${adData?.company}
دسته بندی شغلی:   ${adData?.category}
مهارت های مورد نیاز:   ${adData?.skills}
استان:   ${adData?.location}
نوع قرارداد:   ${adData?.jobType}
سابقه کار:   ${adData?.workExperience}
حداقل حقوق:   ${adData?.salary}

${adData?.description}`
    ctx.reply(message, {
      reply_markup: {
        keyboard: [
          [{ text: "انصراف" }]
        ]
      }
    })
    cancleReportAd(true, true)
  })

  bot.on("message", (ctx, next) => {
    if (cancleReportAd(false)) {
      let reports = fs.readFileSync("./data/config.json")
      let reportsData = JSON.parse(reports)
      let newReport = { id: ctx.chat.id, count_ad: countRep, report_message: ctx.message.text, confirmed: false }
      reportsData[4].reports_ads.push(newReport)
      fs.writeFileSync("./data/config.json", JSON.stringify(reportsData))
      ctx.reply("گزارش شما با موفقیت ثبت شد.", {
        reply_markup: menuKey(ctx)
      })

      let admin = process.env.ADMIN
      let admins = fs.readFileSync("./data/config.json")
      let adminsData = JSON.parse(admins)[0]
      let adminHas = true
      adminsData.admins.map(a => {
        if (a == admin) {
          adminHas = false
        }
        bot.telegram.sendMessage(a, "یک آگهی گزارش شد.").then(res => { }).catch(rej => { })
      })
      if (adminHas) {
        bot.telegram.sendMessage(admin, "یک آگهی گزارش شد.").then(res => { }).catch(rej => { })
      }

      cancleReportAd(true, false)
    }
    next(ctx)
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