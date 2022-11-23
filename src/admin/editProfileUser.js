const [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser] = require("./config")
const fs = require("fs")

module.exports = (bot) => {
  let profileUser = {}

  let users = fs.readFileSync("./data/users.json")
  let usersData = JSON.parse(users)
  let eup = usersData.map(u => `edit-user-profile-${u}`)

  bot.action(eup, ctx => {
    ctx.deleteMessage()

    let profiles = fs.readFileSync("./data/profiles.json")
    let profilesData = JSON.parse(profiles)
    profileUser = profilesData.filter(p => p.id == ctx.match.split("-")[3])[0]

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
`
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "نام ", callback_data: "edit-user-firstname" }, { text: "نام خانوادگی", callback_data: "edit-user-lastname" }],
          [{ text: "شماره تماس", callback_data: "edit-user-phone" }, { text: "آدرس", callback_data: "edit-user-address" }, { text: "ایمیل", callback_data: "edit-user-email" }],
          [{ text: "موقعیت شغلی", callback_data: "edit-user-jobPosition" }, { text: "رزومه", callback_data: "edit-user-resume" }],
          [{ text: "انصراف", callback_data: "edit-user-cancle" }]
        ]
      }
    })
  })

  bot.action("edit-user-cancle", ctx => {
    ctx.deleteMessage()
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
`
    ctx.reply(message)
  })

  let editParams = ["edit-user-firstname", "edit-user-lastname", "edit-user-phone", "edit-user-address", "edit-user-email", "edit-user-jobPosition", "edit-user-resume"]
  bot.action(editParams, ctx => {
    ctx.deleteMessage()
    switch (ctx.match) {
      case "edit-user-firstname":
        ctx.reply("نام: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 1)
        break;
      case "edit-user-lastname":
        ctx.reply("نام خانوادگی: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 2)
        break;
      case "edit-user-phone":
        ctx.reply("شماره تماس: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 3)
        break;
      case "edit-user-address":
        ctx.reply("آدرس: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 4)
        break;
      case "edit-user-email":
        ctx.reply("ایمیل: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 5)
        break;
      case "edit-user-jobPosition":
        ctx.reply("موقعیت شغلی: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 6)
        break;
      case "edit-user-resume":
        ctx.reply("رزومه: ", {
          reply_markup: {
            keyboard: [
              [{ text: "بازگشت" }]
            ]
          }
        })
        cancleEditUser(true, "All", true, 7)
        break;

      default:
        break;
    }
  })

  bot.on("message", (ctx, next) => {
    let { editUser, stepEditUser } = cancleEditUser(false, "All")
    if (editUser) {
      switch (stepEditUser) {
        case 1:
          profileUser.firstname = ctx.message.text
          sendMenuEdit(ctx)
          cancleEditUser(true, "All", false, 0)
          break;
        case 2:
          profileUser.lastname = ctx.message.text
          sendMenuEdit(ctx)
          cancleEditUser(true, "All", false, 0)
          break;
        case 3:
          profileUser.phone = ctx.message.text
          sendMenuEdit(ctx)
          cancleEditUser(true, "All", false, 0)
          break;
        case 4:
          profileUser.address = ctx.message.text
          sendMenuEdit(ctx)
          cancleEditUser(true, "All", false, 0)
          break;
        case 5:
          profileUser.email = ctx.message.text
          sendMenuEdit(ctx)
          cancleEditUser(true, "All", false, 0)
          break;
        case 6:
          profileUser.jobPosition = ctx.message.text
          sendMenuEdit(ctx)
          cancleEditUser(true, "All", false, 0)
          break;
        case 7:
          if (ctx.updateSubTypes[0] === "document") {
            profileUser.resume = ctx.message.document.file_id
            sendMenuEdit(ctx)
            cancleEditUser(true, "All", false, 0)
          } else {
            ctx.reply("لطفا رزومه را به صورت فایل (pdf) ارسال کنید.")
          }
          break;

        default:
          break;
      }
    }
    next(ctx)
  })

  const sendMenuEdit = ctx => {
    let profiless = fs.readFileSync("./data/profiles.json")
    let profilessData = JSON.parse(profiless)
    let profilessFilter = profilessData.filter(u => u.id != profileUser.id)
    profilessFilter.push(profileUser)
    fs.writeFileSync("./data/profiles.json", JSON.stringify(profilessFilter))

    ctx.reply("تغییرات ذخیره شد.", {
      reply_markup: menuKey()
    })
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
`
    ctx.reply(message, {
      reply_markup: {
        inline_keyboard: [
          [{text: "دریافت رزومه", callback_data: "get-user-resume"}],
          [{text: "ویرایش اطلاعات", callback_data: `edit-user-profile-${profileUser?.id}`}],
        ]
      }
    })
  }

}