const [
  menuKey,
  admin,
  cancleUserInfo] = require("./config")
const fs = require("fs")

module.exports = bot => {
  bot.hears("کاربر های ربات", ctx => {
    if (admin(ctx)) {
      let users = fs.readFileSync("./data/profiles.json")
      let usersData = JSON.parse(users)
      let message = ""
      usersData.forEach(u => {
        message = 
`${message}
${u.id}   @${u.username}`
      });
      ctx.reply(
`${message}

تعداد تمام کاربرها:   ${usersData.length}`)
    }
  })
}