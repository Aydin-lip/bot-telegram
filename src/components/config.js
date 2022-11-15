const fs = require("fs")

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
      ]
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


module.exports = [
  callUserProfile,
  callRegesteredAds,
  complatedProf,
  registeredNewAd,
  editProfileHandler,
  cancleEditProfile,
  cancleRegisterNewAd]