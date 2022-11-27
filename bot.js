require("dotenv").config()
const Telegraf = require("telegraf")
const bot = new Telegraf(process.env.TOKEN)



const components = require("./src/components")
components(bot)

const admin = require("./src/admin")
admin(bot)



bot.launch()