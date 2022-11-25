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
  sendUserMess] = require("./config")
const fs = require("fs")
require("dotenv").config()

module.exports = bot => {
  let admins = fs.readFileSync("./data/config.json")
  let adminsData = JSON.parse(admins)

  bot.hears("ادمین های ربات", ctx => {
    if (admin(ctx)) {
      let message = "ادمین های ربات"
      let key = []

      adminsData[0].admins.filter(a => {
        message = `
${message}
${a == process.env.ADMIN ? `* ${a}` : a}`
        if (a != process.env.ADMIN) {
          key.push([{ text: `حذف ${a}`, callback_data: `del-admin-${a}` }])
        }
      })

      ctx.reply(message, {
        reply_markup: {
          inline_keyboard: key
        }
      })
    }
  })

  let delAdmin = adminsData[0].admins.map(a => `del-admin-${a}`)
  bot.action(delAdmin, ctx => {
    let match = ctx.match.split("-")[2]
    ctx.deleteMessage()

    let message = `
آیا شما میخواهید این ادمین را حذف کنید؟
id:  ${match}
`
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "تایید", callback_data: `yes-del-admin-${match}` }],
          [{ text: "کنسل", callback_data: `no-del` }]
        ]
      }
    })
  })

  let yesDelAdmin = adminsData[0].admins.map(a => `yes-del-admin-${a}`)
  bot.action(yesDelAdmin, ctx => {
    let match = ctx.match.split("-")[3]
    ctx.deleteMessage()

    adminsData[0].admins = adminsData[0].admins.filter(a => a != match)
    fs.writeFileSync("./data/config.json", JSON.stringify(adminsData))

    let message = `
ادمین ${match} با موفقیت حذف شد.
`
    ctx.reply(message)
  })

  bot.action("no-del", ctx => {
    ctx.deleteMessage()
    let message = "ادمین های ربات"
    let key = []

    adminsData[0].admins.filter(a => {
      message = `
${message}
${a == process.env.ADMIN ? `* ${a}` : a}`
      if (a != process.env.ADMIN) {
        key.push([{ text: `حذف ${a}`, callback_data: `del-admin-${a}` }])
      }
    })

    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: key
      }
    })
  })

}