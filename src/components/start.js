const fs = require("fs")
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

module.exports = (bot) => {
  bot.use(async (ctx, next) => {
    let read = fs.readFileSync("./data/users.json")
    let data = JSON.parse(read)
    let hast = false
    if (data.length > 0) {
      data.filter(u => {
        if (u == ctx.chat.id) {
          hast = true
        }
      })
    }
    if (!hast) {
      let profile = { id: ctx.chat.id, from: 0, nameuser: `${ctx.chat.first_name ? ctx.chat.first_name : ""} ${ctx.chat.last_name ? last_name : ""}`, username: ctx.chat.username ? ctx.chat.username : "", firstname: ctx.chat.first_name, lastname: ctx.chat.last_name ? ctx.chat.last_name : "", phone: "", address: "", email: "", jobPosition: "", resume: "" }
      if (ctx.message.text.split(" ").length == 2) {
        profile.from = ctx.message.text.split(" ")[1]
      }
      let profiles = fs.readFileSync("./data/profiles.json")
      let profilesData = JSON.parse(profiles)
      profilesData.push(profile)
      fs.writeFileSync("./data/profiles.json", JSON.stringify(profilesData))

      let user = ctx.chat.id
      data.push(user)
      fs.writeFileSync("./data/users.json", JSON.stringify(data))
    }

    let joined = await joinChannel(ctx)
    if (joined) {
      next(ctx)
    }
  })

  const joinChannel = async ctx => {
    let channel = fs.readFileSync("./data/config.json")
    let channelData = JSON.parse(channel)
    let join = false
    if (channelData[1].channel) {
      await bot.telegram.getChatMember(channelData[1].channel, ctx.chat.id).then(res => {
        if (res.status !== "left") {
          join = true
        }
      }).catch(rej => {
        join = false
      })


      if (!join) {
        let message = `
شما برای فعالیت در ربات ابتدا باید عضو کانال زیر شوید.
${channelData[1].channel}
`
        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "عضویت در کانال", url: `https://t.me/${channelData[1].channel.slice(1)}` }],
              [{ text: "/start", callback_data: "start" }]
            ]
          }
        })
      }
      return join
    }
    return true
  }

  bot.action("start", ctx => {
    ctx.deleteMessage()
    startHandel(ctx)
  })

  bot.start(ctx => {
    startHandel(ctx)
  })

  const startHandel = ctx => {
    const message = `
سلام ${ctx.chat.first_name} 🖐️
به ربات پیدا کردن شغل خوش آمدید.
اگر دنبال شغل مناسب هستید با استفاده از این ربات میتوانید پیدا کنید 
و اگر دارایه بیزینس یا شرکتی هستید میتوانید با ثبت آگهی استخدام نیروی های مد نظر خود را جذب کنید.
`
    ctx.reply(message, {
      reply_markup: menuKey(ctx)
    })
  }
}