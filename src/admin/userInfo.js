const [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser,
  callRegesteredAds,
  callProfileUser,
  countAds] = require("./config")
const fs = require("fs")
const editProfileUser = require("./editProfileUser")

module.exports = bot => {
  bot.hears("اطلاعات دقیق کاربر مورد نظر", ctx => {
    if (admin(ctx)) {
      let message =
        `
لطفا آیدی عددی یا یوزرنیم کاربر مورد نظر را ارسال کنید.
Ex) @aydin_lip
Ex) 344445518
`
      ctx.reply(message, {
        reply_markup: {
          keyboard: [
            [{ text: "بازگشت" }]
          ],
          resize_keyboard: true
        }
      })
      cancleUserInfo(true, true)
    }
  })

  let id = ""
  let profileUser = {}
  bot.on("message", (ctx, next) => {
    if (cancleUserInfo(false)) {
      if (ctx.message.text.includes("@")) {
        id = ctx.message.text.slice(1)
      } else {
        id = ctx.message.text
      }

      let users = fs.readFileSync("./data/profiles.json")
      let usersData = JSON.parse(users)
      usersData.filter(u => {
        if (u.id == id || u.username == id) {
          profileUser = u
        }
      })

      if (profileUser?.id) {
        let ads = callRegesteredAds()
        let registerAdUser = ads.filter(a => a.id == profileUser?.id)

        let message =
          `
آیدی:   ${profileUser?.id}
دعوت شده توسط آیدی:   ${profileUser?.from}
اسم اکانت:   ${profileUser?.nameuser}
یوزرنیم:   @${profileUser?.username}
نام:   ${profileUser?.firstname}
نام خانوادگی:   ${profileUser?.lastname}
شماره تماس:   ${profileUser?.phone}
آدرس:   ${profileUser?.address}
ایمیل:   ${profileUser?.email}
موقعیت شغلی:   ${profileUser?.jobPosition}
رزومه:   ${profileUser?.resume ? "✔" : "❌"}

آگهی های ثبت شده کاربر:   ${registerAdUser.length}
`
        ctx.reply(message, {
          reply_markup: {
            inline_keyboard: [
              [{text: "دریافت رزومه", callback_data: "get-user-resume"}],
              [{text: "ویرایش اطلاعات", callback_data: `edit-user-profile-${profileUser?.id}`}],
            ]
          },
          reply_to_message_id: ctx.message.message_id,
        })

        setTimeout(() => {
          cancleUserInfo(true, false)
          ctx.reply("لطفا یکی از گزینه های زیر را انتخاب کنید.", {
            reply_markup: menuKey()
          })
        }, 1000);

      } else {
        ctx.reply("کاربر مورد نظر پیدا نشد.")
      }
    }
    next(ctx)
  })
  
  bot.action("get-user-resume", ctx => {
    console.log(ctx.state)
    bot.telegram.sendDocument(ctx.chat.id, profileUser?.resume)
  })
  
  editProfileUser(bot)
}