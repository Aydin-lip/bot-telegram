const fs = require("fs")

module.exports = (bot) => {
  bot.start(ctx => {
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
      let profile = { id: ctx.chat.id, firstname: ctx.chat.first_name, lastname: ctx.chat.last_name ? ctx.chat.last_name : "", phone: "", address: "", email: "", jobPosition: "", resume: "" }
      let profiles = fs.readFileSync("./data/profiles.json")
      let profilesData = JSON.parse(profiles)
      profilesData.push(profile)
      fs.writeFileSync("./data/profiles.json", JSON.stringify(profilesData))

      let user = ctx.chat.id
      data.push(user)
      fs.writeFileSync("./data/users.json", JSON.stringify(data))
    }

    const message = `
سلام ${ctx.chat.first_name} 🖐️
به ربات پیدا کردن شغل خوش آمدید.
اگر دنبال شغل مناسب هستید با استفاده از این ربات میتوانید پیدا کنید 
و اگر دارایه بیزینس یا شرکتی هستید میتوانید با ثبت آگهی استخدام نیروی های مد نظر خود را جذب کنید.
`
    ctx.reply(message, {
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