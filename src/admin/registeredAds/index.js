const [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser,
  callRegesteredAds,
  callProfileUser,
  countAds] = require("../config")
const fs = require("fs")
const editAdUser = require("./editAdUser")

module.exports = bot => {
  bot.hears("مشخصات آگهی های ثبت شده", ctx => {
    if (admin(ctx)) {
      let ads = callRegesteredAds()
      ads.forEach(ad => {
        let profile = callProfileUser(ad.id)
        let message = `
اطلاعات کاربر
  آیدی:   ${profile?.id}
  دعوت شده توسط آیدی:   ${profile?.from}
  اسم اکانت:   ${profile?.nameuser}
  یوزرنیم:   @${profile?.username}
  نام:   ${profile?.firstname}
  نام خانوادگی:   ${profile?.lastname}
  شماره تماس:   ${profile?.phone}
  آدرس:   ${profile?.address}
  ایمیل:   ${profile?.email}
  موقعیت شغلی:   ${profile?.jobPosition}
  رزومه:   ${profile?.resume ? "✔" : "❌"}

اطلاعات آگهی
  نام شرکت:   ${ad.company}
  دسته بندی شغلی:   ${ad.category}
  مهارت های مورد نیاز:   ${ad.skills}
  استان:   ${ad.location}
  نوع قرارداد:   ${ad.jobType}
  سابقه کار:   ${ad.workExperience}
  حداقل حقوق:   ${ad.salary}
  ${ad.description}`

        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "ویرایش اطلاعات آگهی", callback_data: `edit-ad-user-${ad.count}` }],
              [{ text: "مسدود کردن آگهی", callback_data: "block-ad-user" }],
              [{ text: "حذف آگهی", callback_data: `delete-ad-user-${ad.count}` }],
            ]
          }
        })

      });

    }
  })

  let counts = countAds()
  let del = counts.map(c => `delete-ad-user-${c.count}`)
  bot.action(del, ctx => {
    ctx.deleteMessage()
    let match = ctx.match.split("-")[3]
    let ads = callRegesteredAds()
    let userAd = {}
    let profile = {}

    ads.filter(ad => {
      if (ad.count == match) {
        userAd = ad
        profile = callProfileUser(ad.id)
        let message = `
آیا شما میخواید این آگهی را حذف کنید؟
  نام شرکت:   ${ad.company}
  دسته بندی شغلی:   ${ad.category}
  مهارت های مورد نیاز:   ${ad.skills}
  استان:   ${ad.location}
  نوع قرارداد:   ${ad.jobType}
  سابقه کار:   ${ad.workExperience}
  حداقل حقوق:   ${ad.salary}
  ${ad.description}`

        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "تایید", callback_data: "yes-delete-ad-user" }],
              [{ text: "انصراف", callback_data: "edit-cancel-ad-user" }]
            ]
          }
        })

      }
    })

    bot.action("yes-delete-ad-user", ctx => {
      ctx.deleteMessage()

      let message = `
نام شرکت:   ${userAd.company}
دسته بندی شغلی:   ${userAd.category}
مهارت های مورد نیاز:   ${userAd.skills}
استان:   ${userAd.location}
نوع قرارداد:   ${userAd.jobType}
سابقه کار:   ${userAd.workExperience}
حداقل حقوق:   ${userAd.salary}
${userAd.description}`

      ctx.reply(message)

      let filterAds = ads.filter(a => a.count != match)
      fs.writeFileSync("./data/registeredAds.json", JSON.stringify(filterAds))

      ctx.reply("آگهی با موفقیت حذف شد.")

    })

    bot.action("edit-cancel-ad-user", ctx => {

      let message = `
اطلاعات کاربر
  آیدی:   ${profile?.id}
  دعوت شده توسط آیدی:   ${profile?.from}
  اسم اکانت:   ${profile?.nameuser}
  یوزرنیم:   @${profile?.username}
  نام:   ${profile?.firstname}
  نام خانوادگی:   ${profile?.lastname}
  شماره تماس:   ${profile?.phone}
  آدرس:   ${profile?.address}
  ایمیل:   ${profile?.email}
  موقعیت شغلی:   ${profile?.jobPosition}
  رزومه:   ${profile?.resume ? "✔" : "❌"}

اطلاعات آگهی
  نام شرکت:   ${userAd.company}
  دسته بندی شغلی:   ${userAd.category}
  مهارت های مورد نیاز:   ${userAd.skills}
  استان:   ${userAd.location}
  نوع قرارداد:   ${userAd.jobType}
  سابقه کار:   ${userAd.workExperience}
  حداقل حقوق:   ${userAd.salary}
  ${userAd.description}`

      ctx.reply(message, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "ویرایش اطلاعات آگهی", callback_data: `edit-ad-user-${userAd.count}` }],
            [{ text: "مسدود کردن آگهی", callback_data: "block-ad-user" }],
            [{ text: "حذف آگهی", callback_data: `delete-ad-user-${userAd.count}` }],
          ]
        }
      })

    })


  })

  editAdUser(bot)

}