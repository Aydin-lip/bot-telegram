module.exports = bot => {
  bot.help(ctx => {
    let message = `
/start - Restart  
/registeredads - Receive registered ads 
/myads - Receive my registered ads
/newad - Register a new ad
/profile - Your profile  
/invite - Invite friends  
/about - About us  
/channel - Our channel
/support - Talk to the admin 
/help - Help
`
    ctx.reply(message)
  })
}