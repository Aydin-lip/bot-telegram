const fs = require("fs")

module.exports = bot => {
  bot.hears("درباره ما", ctx => {
    let aboutText = fs.readFileSync("./data/config.json")
    let aboutTextData = JSON.parse(aboutText)
    ctx.reply(aboutTextData[3].about_message)
  })
}