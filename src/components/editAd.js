const fs = require("fs")
const [
  callUserProfile,
  callRegesteredAds,
  callRegesteredAdsCount,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd,
  cancleEditAd] = require("./config")

module.exports = bot => {

  let myAd = {}
  let editAd = false
  let step = 0
  let editCount = 0

  bot.hears("آگهی های من", (ctx, next) => {
    let myAdsID = []
    const { adsCount, myAdsCount } = callRegesteredAdsCount(ctx)
    myAdsCount.map(c => {
      myAdsID.push(`edit-${c}`)
    })
    bot.action(myAdsID, ctx => {
      ctx.deleteMessage()
      editAd = true
      editCount = ctx.match.split("-")[1]
      let { ads, myAds } = callRegesteredAds(ctx)
      ads.filter(a => {
        if (a.count == ctx.match.split("-")[1]) {
          myAd = a
        }
      })
      let message = `
نام شرکت:   ${myAd.company}
دسته بندی شغلی:   ${myAd.category}
مهارت های مورد نیاز:   ${myAd.skills}
استان:   ${myAd.location}
نوع قرارداد:   ${myAd.jobType}
سابقه کار:   ${myAd.workExperience}
حداقل حقوق:   ${myAd.salary}

${myAd.description}`
      let inlineKey = [
        [{ text: "نام شرکت", callback_data: "edit-company" }, { text: "دسته بندی شغلی", callback_data: "edit-category" }],
        [{ text: "مهارت های مورد نیاز", callback_data: "edit-skills" }, { text: "استان", callback_data: "edit-location" }],
        [{ text: "نوع قرارداد", callback_data: "edit-jobType" }, { text: "سابقه کاری", callback_data: "edit-workExperience" }],
        [{ text: "حداقل حقوق", callback_data: "edit-salary" }, { text: "توضیحات", callback_data: "edit-description" }],
        [{ text: "حذف آگهی", callback_data: "delete" }],
        [{ text: "انصراف", callback_data: "edit-cancel" }]
      ]
      ctx.reply(message, {
        reply_markup: {
          inline_keyboard: inlineKey
        }
      })
      cancleEditAd(true, "editAd", true)
    })
    next(ctx)
  })

  let editInfoName = ["edit-company", "edit-category", "edit-skills", "edit-location", "edit-jobType", "edit-workExperience", "edit-salary", "edit-description"]
  bot.action(editInfoName, ctx => {
    ctx.deleteMessage()
    switch (ctx.match.split("-")[1]) {
      case "company":
        ctx.reply(`نام شرکت:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 1)
        break;
      case "category":
        ctx.reply(`دسته بندی شغلی:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 2)
        break
      case "skills":
        ctx.reply(`مهارت های مورد نیاز:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 3)
        break
      case "location":
        ctx.reply(`استان:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 4)
        break
      case "jobType":
        ctx.reply(`نوع قرارداد:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "تمام وقت" }, { text: "پاره وقت" }],
              [{ text: "کارآموزی" }, { text: "دورکاری" }],
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 5)
        break
      case "workExperience":
        ctx.reply(`سابقه کاری:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بدون محدودیت سابقه کار" }, { text: "کمتر از سه سال" }],
              [{ text: "سه تا شش سال" }, { text: "بیش از شش سال" }],
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 6)
        break
      case "salary":
        ctx.reply(`حداقل حقوق:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 7)
        break
      case "description":
        ctx.reply(`توضیحات:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ]
          }
        })
        cancleEditAd(true, "All", true, 8)
        break

      default:
        break;
    }

  })

  bot.on("message", (ctx, next) => {
    let upC = cancleEditAd(false, "All")
    editAd = upC.editAd
    step = upC.stepAd

    if (editAd) {
      switch (step) {
        case 1:
          myAd.company = ctx.message.text
          saveEdit(ctx)
          break;
        case 2:
          myAd.category = ctx.message.text
          saveEdit(ctx)
          break;
        case 3:
          myAd.skills = ctx.message.text
          saveEdit(ctx)
          break;
        case 4:
          myAd.location = ctx.message.text
          saveEdit(ctx)
          break;
        case 5:
          ctx.reply("لطفا یکی از موارد زیر را انتخاب کنید.")
          break;
        case 6:
          ctx.reply("لطفا یکی از موارد زیر را انتخاب کنید.")
          break;
        case 7:
          myAd.salary = ctx.message.text
          saveEdit(ctx)
          break;
        case 8:
          myAd.description = ctx.message.text
          saveEdit(ctx)
          break;

        default:
          break;
      }
    }

    next(ctx)
  })

  let jobType = ["تمام وقت", "پاره وقت", "کارآموزی", "دورکاری"]
  bot.hears(jobType, (ctx, next) => {
    let upC = cancleEditAd(false, "All")
    editAd = upC.editAd
    step = upC.stepAd
    if (editAd && step == 5) {
      myAd.jobType = ctx.match
      saveEdit(ctx)
    }
    next(ctx)
  })

  let workExperience = ["بدون محدودیت سابقه کار", "کمتر از سه سال", "سه تا شش سال", "بیش از شش سال"]
  bot.hears(workExperience, (ctx, next) => {
    let upC = cancleEditAd(false, "All")
    editAd = upC.editAd
    step = upC.stepAd
    if (editAd && step == 6) {
      myAd.workExperience = ctx.match
      saveEdit(ctx)
    }
    next(ctx)
  })

  const saveEdit = ctx => {
    let { ads, myAds } = callRegesteredAds(ctx)
    let filterAds = []
    ads.filter(a => {
      if (a.count != editCount) {
        filterAds.push(a)
      }
    })
    filterAds.push(myAd)
    fs.writeFileSync("./data/registeredAds.json", JSON.stringify(filterAds))
    cancleEditAd(true, "All", false, 0)

    ctx.reply("تغییرات ذخیره شد.", {
      reply_markup: {
        keyboard: [
          [{ text: "آگهی های ثبت شده" }],
          [{ text: "ثبت آگهی جدید" }, { text: "آگهی های من" }],
          [{ text: "پروفایل" }, { text: "دعوت دوستان" }],
          [{ text: "درباره ما" }, { text: "کانال ما" }]
        ],
        resize_keyboard: true
      }
    })
    let message = `
نام شرکت:   ${myAd.company}
دسته بندی شغلی:   ${myAd.category}
مهارت های مورد نیاز:   ${myAd.skills}
استان:   ${myAd.location}
نوع قرارداد:   ${myAd.jobType}
سابقه کار:   ${myAd.workExperience}
حداقل حقوق:   ${myAd.salary}

${myAd.description}`
    let inlineKey = [
      [{ text: "ویرایش", callback_data: `edit-${myAd.count}` }]
    ]
    ctx.reply(message, {
      // reply_markup: {
      //   inline_keyboard: inlineKey
      // }
    })
  }

  bot.action("delete", ctx => {
    let upC = cancleEditAd(false, "All")
    editAd = upC.editAd
    step = upC.stepAd
    if (editAd) {
      ctx.deleteMessage()
      let message = `
آیا شما میخواهید این آگهی را حذف کنید؟

نام شرکت:   ${myAd.company}
دسته بندی شغلی:   ${myAd.category}
مهارت های مورد نیاز:   ${myAd.skills}
استان:   ${myAd.location}
نوع قرارداد:   ${myAd.jobType}
سابقه کار:   ${myAd.workExperience}
حداقل حقوق:   ${myAd.salary}

${myAd.description}`
      let inlineKey = [
        [{ text: "تایید", callback_data: `yes-delete` }],
        [{ text: "انصراف", callback_data: "edit-cancel" }]
      ]
      ctx.reply(message, {
        reply_markup: {
          inline_keyboard: inlineKey
        }
      })
    }
  })

  bot.action("yes-delete", ctx => {
    let upC = cancleEditAd(false, "All")
    editAd = upC.editAd
    step = upC.stepAd
    if (editAd) {
      ctx.deleteMessage()
      let { ads, myAds } = callRegesteredAds(ctx)
      let filterAds = []
      ads.filter(a => {
        if (a.count != editCount) {
          filterAds.push(a)
        }
      })
      fs.writeFileSync("./data/registeredAds.json", JSON.stringify(filterAds))
      ctx.reply("آگهی شما با موفقیت حذف شد.")
    }
  })


  bot.action("edit-cancel", ctx => {
    ctx.deleteMessage()
    let { ads, myAds } = callRegesteredAds(ctx)
    ads.filter(a => {
      if (a.count == editCount) {
        myAd = a
      }
    })
    let message = `
نام شرکت:   ${myAd.company}
دسته بندی شغلی:   ${myAd.category}
مهارت های مورد نیاز:   ${myAd.skills}
استان:   ${myAd.location}
نوع قرارداد:   ${myAd.jobType}
سابقه کار:   ${myAd.workExperience}
حداقل حقوق:   ${myAd.salary}

${myAd.description}`
    let inlineKey = [
      [{ text: "ویرایش", callback_data: `edit-${myAd.count}` }]
    ]
    ctx.reply(message, {
      // reply_markup: {
      //   inline_keyboard: inlineKey
      // }
    })
  })

}