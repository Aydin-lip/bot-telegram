const [
  callUserProfile,
  callRegesteredAds,
  callRegesteredAdsCount,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd] = require("./config")
const cancel = require("./cancel")
const fs = require("fs")

module.exports = bot => {
  let profile = {}
  let editProfile = { id: "", firstname: "", lastname: "", phone: "", address: "", email: "", jobPosition: "", resume: "" }
  let editProf = false
  let skipNum = 0
  let step = 0
  bot.action("edit-profile", async ctx => {
    profile = callUserProfile(ctx)
    ctx.deleteMessage()
    editProfile.id = ctx.chat.id
    cancleEditProfile(true, "All", true, 1, 0)
    ctx.reply("ویرایش پروفایل", {
      reply_markup: {
        remove_keyboard: true,
        keyboard: [
          [{ text: "انصراف" }]
        ],
        resize_keyboard: true
      }
    })
    haveParam(ctx, `نام:   ${profile?.firstname}`, profile?.firstname, "firstname")
  })

  let skips = ["skip-firstname", "skip-lastname", "skip-phone", "skip-address", "skip-email", "skip-jobPosition", "skip-resume"]
  bot.action(skips, ctx => {
    let upC = cancleEditProfile(false, "All")
    editProf = upC.editProf
    step = upC.stepProf
    skipNum = upC.skipProf
    switch (ctx.match.split("-")[1]) {
      case "firstname":
        if (step === 1) {
          ctx.deleteMessage()
          editProfile.firstname = profile?.firstname
          cancleEditProfile(true, "All", true, 1, 1)
          ctx.reply(`نام:   ${profile?.firstname}`)
          nextStepEditProfile(ctx)
        }
        break;
      case "lastname":
        if (step === 2) {
          ctx.deleteMessage()
          editProfile.lastname = profile?.lastname
          cancleEditProfile(true, "All", true, 2, 2)
          ctx.reply(`نام خانوادگی:   ${profile?.lastname}`)
          nextStepEditProfile(ctx)
        }
        break;
      case "phone":
        if (step === 3) {
          ctx.deleteMessage()
          editProfile.phone = profile?.phone
          cancleEditProfile(true, "All", true, 3, 3)
          ctx.reply(`شماره تماس:   ${profile?.phone}`)
          nextStepEditProfile(ctx)
        }
        break;
      case "address":
        if (step === 4) {
          ctx.deleteMessage()
          editProfile.address = profile?.address
          cancleEditProfile(true, "All", true, 4, 4)
          ctx.reply(`آدرس:   ${profile?.address}`)
          nextStepEditProfile(ctx)
        }
        break;
      case "email":
        if (step === 5) {
          ctx.deleteMessage()
          editProfile.email = profile?.email
          cancleEditProfile(true, "All", true, 5, 5)
          ctx.reply(`ایمیل:   ${profile?.email}`)
          nextStepEditProfile(ctx)
        }
        break;
      case "jobPosition":
        if (step === 6) {
          ctx.deleteMessage()
          editProfile.jobPosition = profile?.jobPosition
          cancleEditProfile(true, "All", true, 6, 6)
          ctx.reply(`موقعیت شغلی:   ${profile?.jobPosition}`)
          nextStepEditProfile(ctx)
        }
        break;
      case "resume":
        if (step === 7) {
          ctx.deleteMessage()
          editProfile.resume = profile?.resume
          cancleEditProfile(true, "All", true, 7, 7)
          ctx.reply(`رزومه:   ${profile?.resume ? "✔" : ""}`)
          nextStepEditProfile(ctx)
        }
        break;

      default:
        break;
    }
  })

  bot.on("message", (ctx, next) => {
    editProf = cancleEditProfile(false, "editProf")
    if (editProf) {
      nextStepEditProfile(ctx)
    }
    next(ctx)
  })

  const haveParam = (ctx, message, info, nameInfo) => {
    let key = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "همین بماند", callback_data: `skip-${nameInfo}` }]
        ]
      }
    }
    ctx.reply(message, info ? key : {})
  }

  const nextStepEditProfile = ctx => {
    let upC = cancleEditProfile(false, "All")
    editProf = upC.editProf
    step = upC.stepProf
    skipNum = upC.skipProf
    switch (step) {
      case 1:
        if (skipNum !== 1) {
          editProfile.firstname = ctx.message.text
        }
        haveParam(ctx, `نام خانوادگی:   ${profile?.lastname}`, profile?.lastname, "lastname")
        cancleEditProfile(true, "step", "", 2)
        break;
      case 2:
        if (skipNum !== 2) {
          editProfile.lastname = ctx.message.text
        }
        ctx.reply("لطفا شماره تماس خود وارد یا انتخاب کنید.", {
          reply_markup: {
            keyboard: [
              [{ text: "ارسال شماره تماس", request_contact: true }],
              [{ text: "انصراف" }]
            ],
            resize_keyboard: true
          }
        })
        haveParam(ctx, `شماره تماس:   ${profile?.phone}`, profile?.phone, "phone")
        cancleEditProfile(true, "step", "", 3)
        break;
      case 3:
        if (skipNum !== 3) {
          if (ctx.updateSubTypes[0] === "contact") {
            editProfile.phone = ctx.message.contact.phone_number
          } else {
            editProfile.phone = ctx.message.text
          }
        }
        ctx.reply("به طور دقیق لازم نیست.", {
          reply_markup: {
            keyboard: [
              [{ text: "انصراف" }]
            ],
            resize_keyboard: true
          }
        })
        haveParam(ctx, `آدرس:   ${profile?.address}`, profile?.address, "address")
        cancleEditProfile(true, "step", "", 4)
        break;
      case 4:
        if (skipNum !== 4) {
          editProfile.address = ctx.message.text
        }
        haveParam(ctx, `ایمیل:   ${profile?.email}`, profile?.email, "email")
        cancleEditProfile(true, "step", "", 5)
        break;
      case 5:
        if (skipNum !== 5) {
          editProfile.email = ctx.message.text
        }
        haveParam(ctx, `موقعیت شغلی:   ${profile?.jobPosition}`, profile?.jobPosition, "jobPosition")
        cancleEditProfile(true, "step", "", 6)
        break;
      case 6:
        if (skipNum !== 6) {
          editProfile.jobPosition = ctx.message.text
        }
        let message = `
رزومه:   ${profile?.resume ? "✔" : ""}
لطفا رزومه خود را به صورت فایل (pdf) ارسال کنید.
`
        haveParam(ctx, message, profile?.resume, "resume")
        cancleEditProfile(true, "step", "", 7)
        break;
      case 7:
        if (skipNum !== 7) {
          if (ctx.updateSubTypes[0] === "document") {
            editProfile.resume = ctx.message.document.file_id
            ctx.reply("تمامی موارد به درستی وارد شد", {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "ذخیر تغییرات", callback_data: "save-change" }]
                ]
              }
            })
            cancleEditProfile(true, "All", false, 8, 0)
          } else {
            ctx.reply("لطفا رزومه خود را به صورت فایل (pdf) ارسال کنید.")
          }
        } else {
          ctx.reply("تمامی موارد به درستی وارد شد", {
            reply_markup: {
              inline_keyboard: [
                [{ text: "ذخیر تغییرات", callback_data: "save-change" }]
              ]
            }
          })
          cancleEditProfile(true, "All", false, 8, 0)
        }
        break

      default:
        break;
    }
  }

  bot.action("save-change", ctx => {
    ctx.deleteMessage()
    editProf = false
    step = 0
    skipNum = 0
    cancleEditProfile(true, "All", false, 0, 0)
    ctx.reply("تمامی موارد به درستی وارد شد.")

    let profiles = fs.readFileSync("./data/profiles.json")
    let profilesData = JSON.parse(profiles)
    let allProfiles = []
    profilesData.filter(p => {
      if (p.id != ctx.chat.id) {
        allProfiles.push(p)
      }
    })
    allProfiles.push(editProfile)
    fs.writeFileSync("./data/profiles.json", JSON.stringify(allProfiles))

    const message = `
نام:   ${editProfile?.firstname}
نام خانوادگی:   ${editProfile?.lastname}
شماره تماس:   ${editProfile?.phone}
آدرس:   ${editProfile?.address}
ایمیل:   ${editProfile?.email}
موقعیت شغلی:   ${editProfile?.jobPosition}
رزومه:   ${editProfile?.resume ? "✔" : "❌"}
  `
    ctx.reply(message)

    const messagee = `
تغییرات پروفایل با موفقیت ذخیره شد.
لطفا یکی از گزینه های زیر را انتخاب کنید.
  `
    ctx.reply(messagee, {
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
  })
}