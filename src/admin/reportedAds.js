const [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser,
  callRegesteredAds,
  callProfileUser,
  countAds,
  cancleEditAdUser,
  sendAllMess,
  sendUserMess,
  addAdmin,
  changeChannelMessage,
  changeChannel,
  aboutUs] = require("./config")
const fs = require("fs")

module.exports = bot => {
  let reports = fs.readFileSync("./data/config.json")
  let reportsData = JSON.parse(reports)
  let ads = callRegesteredAds()
  let blocks = reportsData[4]?.reports_ads.map(r => `block-ad-${r.count_ad}`)
  let delReps = reportsData[4]?.reports_ads.map(r => `delete-report-ad-${r.count_ad}`)

  bot.hears("آگهی های گزارش شده", ctx => {
    if (admin(ctx)) {
      reports = fs.readFileSync("./data/config.json")
      reportsData = JSON.parse(reports)
      ads = callRegesteredAds()
      reportsData[4]?.reports_ads?.forEach(rep => {
        if (!rep.confirmed) {
          let adData = ads.filter(a => a.count == rep.count_ad)[0]
          let message = `
اطلاعات آگهی گزارش شده
آیدی کاربر:   ${adData?.id}
نام شرکت:   ${adData?.company}
دسته بندی شغلی:   ${adData?.category}
مهارت های مورد نیاز:   ${adData?.skills}
استان:   ${adData?.location}
نوع قرارداد:   ${adData?.jobType}
سابقه کار:   ${adData?.workExperience}
حداقل حقوق:   ${adData?.salary}
${adData?.description}

آیدی کاربر (گزارش کننده):   ${rep.id}
پیام گزارش:   ${rep.report_message}
`
          ctx.reply(message, {
            reply_markup: {
              inline_keyboard: [
                [{ text: "مسدود کردن آگهی", callback_data: `block-ad-${rep.count_ad}` }],
                [{ text: "حذف گزارش", callback_data: `delete-report-ad-${rep.count_ad}` }]
              ]
            }
          })
        }
      });
    }
  })

  bot.action(blocks, ctx => {
    ctx.deleteMessage()
    let match = ctx.match.split("-")[2]
    let filter = reportsData[4]?.reports_ads.filter(r => r.count_ad != match)
    let chngRep = reportsData[4]?.reports_ads.filter(r => r.count_ad == match)[0]
    chngRep.confirmed = true
    filter.push(chngRep)
    reportsData[4].reports_ads = filter
    fs.writeFileSync("./data/config.json", JSON.stringify(reportsData))

    ctx.reply("آگهی مورد نظر با موفقیت به لیست مسدود شده ها اضافه شد.")
  })

  bot.action(delReps, ctx => {
    ctx.deleteMessage()    
    let match = ctx.match.split("-")[3]
    let filter = reportsData[4]?.reports_ads.filter(r => r.count_ad != match)
    reportsData[4].reports_ads = filter
    fs.writeFileSync("./data/config.json", JSON.stringify(reportsData))

    ctx.reply("گزارش مورد نظر با موفقیت حذف شد.")
  })

}