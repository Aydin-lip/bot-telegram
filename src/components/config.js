const fs = require("fs")
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
  return {ads, myAds}
}

const complatedProf = ctx => {
  let profile = callUserProfile(ctx)
  if (profile?.phone) {
    return true
  }
  return false
}

// ["id" , "company", "category", "skills", "location", "jobType", "workExperience", "salary", "description"]

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
  ctx.reply("complated")
}

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


module.exports = [callUserProfile, callRegesteredAds, complatedProf, registeredNewAd, editProfileHandler]