const [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser,
  callRegesteredAds,
  callProfileUser,
  countAds,
  cancleEditAdUser] = require("../config")
const fs = require("fs")

module.exports = bot => {
  let counts = countAds()
  let edit = counts.map(c => `edit-ad-user-${c.count}`)
  let infoEditAd = {}

  bot.action(edit, ctx => {
    ctx.deleteMessage()
    let match = ctx.match.split("-")[3]
    let ads = callRegesteredAds()
    infoEditAd = ads.filter(a => a.count == match)[0]

    let message = `
نام شرکت:   ${infoEditAd.company}
دسته بندی شغلی:   ${infoEditAd.category}
مهارت های مورد نیاز:   ${infoEditAd.skills}
استان:   ${infoEditAd.location}
نوع قرارداد:   ${infoEditAd.jobType}
سابقه کار:   ${infoEditAd.workExperience}
حداقل حقوق:   ${infoEditAd.salary}
    
${infoEditAd.description}`
    let inlineKey = [
      [{ text: "نام شرکت", callback_data: "edit-ad-user-company" }, { text: "دسته بندی شغلی", callback_data: "edit-ad-user-category" }],
      [{ text: "مهارت های مورد نیاز", callback_data: "edit-ad-user-skills" }, { text: "استان", callback_data: "edit-ad-user-location" }],
      [{ text: "نوع قرارداد", callback_data: "edit-ad-user-jobType" }, { text: "سابقه کاری", callback_data: "edit-ad-user-workExperience" }],
      [{ text: "حداقل حقوق", callback_data: "edit-ad-user-salary" }, { text: "توضیحات", callback_data: "edit-ad-user-description" }],
      [{ text: "انصراف", callback_data: "edit-ad-user-cancel" }]
    ]
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: inlineKey
      }
    })
  })

  let editInfoName = ["edit-ad-user-company", "edit-ad-user-category", "edit-ad-user-skills", "edit-ad-user-location", "edit-ad-user-jobType", "edit-ad-user-workExperience", "edit-ad-user-salary", "edit-ad-user-description"]
  bot.action(editInfoName, ctx => {
    ctx.deleteMessage()
    switch (ctx.match.split("-")[3]) {
      case "company":
        ctx.reply(`نام شرکت:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 1)
        break;
      case "category":
        ctx.reply(`دسته بندی شغلی:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 2)
        break
      case "skills":
        ctx.reply(`مهارت های مورد نیاز:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 3)
        break
      case "location":
        ctx.reply(`استان:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 4)
        break
      case "jobType":
        ctx.reply(`نوع قرارداد:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "تمام وقتت" }, { text: "پاره وقتت" }],
              [{ text: "کارآموزیی" }, { text: "دورکاریی" }],
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 5)
        break
      case "workExperience":
        ctx.reply(`سابقه کاری:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بدون محدودیت سابقه کارر" }, { text: "کمتر از سه سالل" }],
              [{ text: "سه تا شش سالل" }, { text: "بیش از شش سالل" }],
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 6)
        break
      case "salary":
        ctx.reply(`حداقل حقوق:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 7)
        break
      case "description":
        ctx.reply(`توضیحات:   `, {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]

            ],
            resize_keyboard: true
          }
        })
        cancleEditAdUser(true, "All", true, 8)
        break

      default:
        break;
    }

  })

  bot.on("message", (ctx, next) => {
    let  {editAdUser, stepEditAdUser}  = cancleEditAdUser(false, "All")

    if (editAdUser) {
      switch (stepEditAdUser) {
        case 1:
          infoEditAd.company = ctx.message.text
          saveEdit(ctx)
          break;
        case 2:
          infoEditAd.category = ctx.message.text
          saveEdit(ctx)
          break;
        case 3:
          infoEditAd.skills = ctx.message.text
          saveEdit(ctx)
          break;
        case 4:
          infoEditAd.location = ctx.message.text
          saveEdit(ctx)
          break;
        case 5:
          ctx.reply("لطفا یکی از موارد زیر را انتخاب کنید.")
          break;
        case 6:
          ctx.reply("لطفا یکی از موارد زیر را انتخاب کنید.")
          break;
        case 7:
          infoEditAd.salary = ctx.message.text
          saveEdit(ctx)
          break;
        case 8:
          infoEditAd.description = ctx.message.text
          saveEdit(ctx)
          break;

        default:
          break;
      }
    }

    next(ctx)
  })

  let jobType = ["تمام وقتت", "پاره وقتت", "کارآموزیی", "دورکاریی"]
  bot.hears(jobType, (ctx, next) => {
    let upC = cancleEditAdUser(false, "All")
    editAd = upC.editAd
    step = upC.stepAd
    if (editAd && step == 5) {
      infoEditAd.jobType = ctx.match
      saveEdit(ctx)
    }
    next(ctx)
  })

  let workExperience = ["بدون محدودیت سابقه کارر", "کمتر از سه سالل", "سه تا شش سالل", "بیش از شش سالل"]
  bot.hears(workExperience, (ctx, next) => {
    let upC = cancleEditAdUser(false, "All")
    editAd = upC.editAd
    step = upC.stepAd
    if (editAd && step == 6) {
      infoEditAd.workExperience = ctx.match
      saveEdit(ctx)
    }
    next(ctx)
  })

  const saveEdit = ctx => {
    let ads = callRegesteredAds(ctx)
    let filterAds = ads.filter(a => a.count != infoEditAd.count)

    filterAds.push(infoEditAd)
    fs.writeFileSync("./data/registeredAds.json", JSON.stringify(filterAds))
    cancleEditAdUser(true, "All", false, 0)

    ctx.reply("تغییرات ذخیره شد.", {
      reply_markup: menuKey(ctx)
    })
    let message = `
نام شرکت:   ${infoEditAd.company}
دسته بندی شغلی:   ${infoEditAd.category}
مهارت های مورد نیاز:   ${infoEditAd.skills}
استان:   ${infoEditAd.location}
نوع قرارداد:   ${infoEditAd.jobType}
سابقه کار:   ${infoEditAd.workExperience}
حداقل حقوق:   ${infoEditAd.salary}

${infoEditAd.description}`

    ctx.reply(message)

  }

}