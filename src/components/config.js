require("dotenv").config()
const fs = require("fs")

// menu inline keyboard for user
const menuKey = ctx => {
  let admin = process.env.ADMIN
  let admins = fs.readFileSync("./data/config.json")
  let adminsData = JSON.parse(admins)[0]
  const managementKey = adminsData.admins.includes(ctx.chat.id) || admin == ctx.chat.id ? [{text: "مدیریت"}] : []
  return {
    keyboard: [
      [{ text: "آگهی های ثبت شده" }],
      [{ text: "ثبت آگهی جدید" }, { text: "آگهی های من" }],
      [{ text: "پروفایل" }, { text: "دعوت دوستان" }],
      [{ text: "درباره ما" }, { text: "کانال ما" }],
      managementKey
    ],
    resize_keyboard: true
  }
}

// get profile user
const callUserProfile = ctx => {
  let profile = {}
  let profiles = fs.readFileSync("./data/profiles.json")
  let profilesData = JSON.parse(profiles)
  profilesData.filter(p => {
    if (p.id == ctx.chat.id) {
      profile = p
    }
  })
  return profile
}

// get all registered Ads and for user ads
const callRegesteredAds = ctx => {
  let ads = []
  let myAds = []
  let allRegister = fs.readFileSync("./data/registeredAds.json")
  ads = JSON.parse(allRegister)
  ads.filter(a => {
    if (a.id == ctx.chat.id) {
      myAds.push(a)
    }
  })
  return { ads, myAds }
}

// get count all ads and user ads
const callRegesteredAdsCount = ctx => {
  let adsCount = []
  let myAdsCount = []
  let allRegister = fs.readFileSync("./data/countAds.json")
  adsCount = JSON.parse(allRegister)
  adsCount.filter(a => {
    if (a.id == ctx.chat.id) {
      myAdsCount.push(a.count)
    }
  })
  return { adsCount, myAdsCount }
}

// user profile complated or no
const complatedProf = ctx => {
  let profile = callUserProfile(ctx)
  if (profile?.phone) {
    return true
  }
  return false
}

// register new ads for user
const registeredNewAd = ctx => {
  if (!complatedProf(ctx)) {
    const message = `
شما پروفایل خود را کامل نکرده اید!
لطفا ابتدا پروفایل خود را تکمیل و سپس اقدام به ثبت آگهی بنمایید :)
  `
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "تکمیل پروفایل", callback_data: "complated-profile" }]
        ]
      }
    })
    return false
  }

  ctx.reply("لطفا اطلاعات خواسته شده در هر بخش را وارد کنید.")
  ctx.reply("نام شرکت: (یا گروه)", {
    reply_markup: {
      keyboard: [
        [{ text: "انصراف" }]
      ],
      resize_keyboard: true
    }
  })
  return true
}

// get user info and edit & get resume
const editProfileHandler = ctx => {
  let profile = callUserProfile(ctx)
  const message = `
نام:   ${profile?.firstname}
نام خانوادگی:   ${profile?.lastname}
شماره تماس:   ${profile?.phone}
آدرس:   ${profile?.address}
ایمیل:   ${profile?.email}
موقعیت شغلی:   ${profile?.jobPosition}
رزومه:   ${profile?.resume ? "✔" : "❌"}
  `
  let resume = [{ text: "دریافت رزومه ثبت شده", callback_data: "get-resume" }]
  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "ویرایش", callback_data: "edit-profile" }],
        profile?.resume ? resume : []
      ]
    }
  })
}

// cancel edit Profile prosecs
let editProf = false
let stepProf = 0
let skipProf = 0
const cancleEditProfile = (edit, how, editProfA, stepProfA, skipProfA) => {
  if (edit) {
    switch (how) {
      case "editProf":
        editProf = editProfA
        break;
      case "step":
        stepProf = stepProfA
        break;
      case "skipNum":
        skipProf = skipProfA
        break;
      case "All":
        editProf = editProfA
        stepProf = stepProfA
        skipProf = skipProfA
        break;

      default:
        break;
    }
  } else {
    switch (how) {
      case "editProf":
        return editProf
      case "step":
        return stepProf
      case "skipNum":
        return skipProf
      case "All":
        return { editProf, stepProf, skipProf }

      default:
        break;
    }
  }
}

// cancle Register New Ad prosecs
let registerAd = false
let stepRegisterAd = 0
const cancleRegisterNewAd = (edit, how, registerAdA, stepRegisterAdA) => {
  if (edit) {
    switch (how) {
      case "registerAd":
        registerAd = registerAdA
        break;
      case "stepRegisterAd":
        stepRegisterAd = stepRegisterAdA
        break;
      case "All":
        registerAd = registerAdA
        stepRegisterAd = stepRegisterAdA
        break;

      default:
        break;
    }
  } else {
    switch (how) {
      case "registerAd":
        return registerAd
      case "stepRegisterAd":
        return stepRegisterAd
      case "All":
        return { registerAd, stepRegisterAd }

      default:
        break;
    }
  }
}

// cancel edit Ad prosecs
let editAd = false
let stepAd = 0
const cancleEditAd = (edit, how, editAdA, stepAdA) => {
  if (edit) {
    switch (how) {
      case "editAd":
        editAd = editAdA
        break;
      case "step":
        stepAd = stepAdA
        break;
      case "All":
        editAd = editAdA
        stepAd = stepAdA
        break;

      default:
        break;
    }
  } else {
    switch (how) {
      case "editAd":
        return editAd
      case "step":
        return stepAd
      case "All":
        return { editAd, stepAd }

      default:
        break;
    }
  }
}


module.exports = [
  menuKey,
  callUserProfile,
  callRegesteredAds,
  callRegesteredAdsCount,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd,
  cancleEditAd]