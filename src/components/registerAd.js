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

const fs = require("fs")

module.exports = bot => {
  // ["id" , "company", "category", "skills", "location", "jobType", "workExperience", "salary", "description"]
  let adInfo = { id: 0, count: 0, company: "", category: "", skills: "", location: "", jobType: "", workExperience: "", salary: "", description: "" }

  let registerAd = false
  let step = 0
  bot.hears("ثبت آگهی جدید", ctx => {
    if (registeredNewAd(ctx)) {
      adInfo.id = ctx.chat.id
      registerAd = true
      cancleRegisterNewAd(true, "All", true, 1)
    }
  })

  let jobType = ["تمام وقت", "پاره وقت", "کارآموزی", "دورکاری"]
  bot.hears(jobType, (ctx, next) => {
    const upC = cancleRegisterNewAd(false, "All")
    registerAd = upC.registerAd
    step = upC.stepRegisterAd
    if (registerAd && step === 5) {
      adInfo.jobType = ctx.match
      ctx.reply("سابقه کاری:", {
        reply_markup: {
          keyboard: [
            [{ text: "بدون محدودیت سابقه کار" }, { text: "کمتر از سه سال" }],
            [{ text: "سه تا شش سال" }, { text: "بیش از شش سال" }],
            [{ text: "انصراف" }]
          ],
          resize_keyboard: true
        }
      })
      cancleRegisterNewAd(true, "stepRegisterAd", true, 6)
    }
    next(ctx)
  })

  let workExperience = ["بدون محدودیت سابقه کار", "کمتر از سه سال", "سه تا شش سال", "بیش از شش سال"]
  bot.hears(workExperience, (ctx, next) => {
    const upC = cancleRegisterNewAd(false, "All")
    registerAd = upC.registerAd
    step = upC.stepRegisterAd
    if (registerAd && step === 6) {
      adInfo.workExperience = ctx.match
      ctx.reply("حداقل حقوق:", {
        reply_markup: {
          keyboard: [
            [{ text: "انصراف" }]
          ],
          resize_keyboard: true
        }
      })
      cancleRegisterNewAd(true, "stepRegisterAd", true, 7)
    }
    next(ctx)
  })

  bot.on("message", (ctx, next) => {
    const upC = cancleRegisterNewAd(false, "All")
    registerAd = upC.registerAd
    step = upC.stepRegisterAd
    if (registerAd) {
      switch (step) {
        case 1:
          adInfo.company = ctx.message.text
          ctx.reply("دسته بندی شغلی:")
          cancleRegisterNewAd(true, "stepRegisterAd", true, 2)
          break;
        case 2:
          adInfo.category = ctx.message.text
          ctx.reply("مهارت های مورد نیاز:")
          cancleRegisterNewAd(true, "stepRegisterAd", true, 3)
          break;
        case 3:
          adInfo.skills = ctx.message.text
          ctx.reply("استان:")
          cancleRegisterNewAd(true, "stepRegisterAd", true, 4)
          break;
        case 4:
          adInfo.location = ctx.message.text
          ctx.reply("نوع قرارداد:", {
            reply_markup: {
              keyboard: [
                [{ text: "تمام وقت" }, { text: "پاره وقت" }],
                [{ text: "کارآموزی" }, { text: "دورکاری" }],
                [{ text: "انصراف" }]
              ],
              resize_keyboard: true
            }
          })
          cancleRegisterNewAd(true, "stepRegisterAd", true, 5)
          break;
        case 5:
          ctx.reply("لطفا یکی از موارد زیر را انتخاب کنید.")
          break;
        case 6:
          ctx.reply("لطفا یکی از موارد زیر را انتخاب کنید.")
          break;
        case 7:
          adInfo.salary = ctx.message.text
          ctx.reply("توضیحات:")
          cancleRegisterNewAd(true, "stepRegisterAd", true, 8)
          break;
        case 8:
          adInfo.description = ctx.message.text
          ctx.reply("تمامی موارد به درستی وارد شد.✅", {
            reply_markup: {
              inline_keyboard: [
                [{ text: "ثبت آگهی", callback_data: "register-ad" }]
              ]
            }
          })
          cancleRegisterNewAd(true, "stepRegisterAd", false, 9)
          break;

        default:
          break;
      }
    }
    next(ctx)
  })

  bot.action("register-ad", ctx => {
    const upC = cancleRegisterNewAd(false, "All")
    registerAd = upC.registerAd
    step = upC.stepRegisterAd
    if (step === 9) {
      ctx.deleteMessage()

      let count = callRegesteredAdsCount(ctx)
      adInfo.count = count.adsCount[count.adsCount.length - 1].count + 1
      let myAdCount = { count: adInfo.count, id: ctx.chat.id }
      let adsCount = count.adsCount
      adsCount.push(myAdCount)

      step = 0
      registerAd = false
      cancleRegisterNewAd(true, "All", false, 0)
      ctx.reply("تمامی موارد به درستی وارد شد✅")
      let objAds = callRegesteredAds(ctx)
      let ads = objAds.ads
      ads.push(adInfo)
      fs.writeFileSync("./data/registeredAds.json", JSON.stringify(ads))
      fs.writeFileSync("./data/countAds.json", JSON.stringify(adsCount))

      const message = `
نام شرکت:   ${adInfo.company}
دسته بندی شغلی:   ${adInfo.category}
مهارت های مورد نیاز:   ${adInfo.skills}
استان:   ${adInfo.location}
نوع قرارداد:   ${adInfo.jobType}
سابقه کار:   ${adInfo.workExperience}
حداقل حقوق:   ${adInfo.salary}

${adInfo.description}`

      ctx.reply(message)

    }

    const messagee = `
آگهی شما با موفقیت ثبت شد.
لطفا یکی از گزینه های زیر را انتخاب کنید.
  `
    ctx.reply(messagee, {
      reply_markup: menuKey(ctx)
    })

  })

}