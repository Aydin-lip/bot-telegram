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
  changeChannel] = require("./config")
const fs = require("fs")

module.exports = bot => {
  let channel = fs.readFileSync("./data/config.json")
  let channelData = JSON.parse(channel)
  bot.hears("اضافه/حذف کردن کانال", ctx => {
    if (admin(ctx)) {
      if (channelData[1].channel) {
        let message = `
کانال فعلی ربات:   ${channelData[1].channel}
`
        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "تغییر کانال", callback_data: "edit_channel" }],
              [{ text: "حذف کانال", callback_data: "delete_channel" }]
            ]
          }
        })
      } else {
        ctx.reply("لطفا آیدی کانال را ارسال کنید", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ],
            reply_to_message_id: ctx.message.message_id + 1
          }
        })
        changeChannel(true, true)
      }
    }
  })

  bot.action("edit_channel", ctx => {
    ctx.deleteMessage()
    ctx.reply("لطفا آیدی کانال را ارسال کنید", {
      reply_markup: {
        keyboard: [
          [{ text: "بازگشت" }]
        ],
        reply_to_message_id: ctx.message.message_id + 1
      }
    })
    changeChannel(true, true)
  })

  bot.action("delete_channel", ctx => {
    ctx.deleteMessage()
    channelData[1].channel = false
    fs.writeFileSync("./data/config.json", JSON.stringify(channelData))
    ctx.reply("کانال با موفقیت حذف شد.", {
      reply_markup: menuKey()
    })
  })

  bot.on("message", (ctx, next) => {
    if (changeChannel(false)) {
      channelData[1].channel = ctx.message.text
      fs.writeFileSync("./data/config.json", JSON.stringify(channelData))
      ctx.reply("تغییرات با موفقیت ذخیره شد.", {
        reply_markup: menuKey()
      })
      changeChannel(true, false)
    }
    next(ctx)
  })

}