module.exports.run = async (bot, message, args) => {
    message.channel.send(`${bot.user.username} 目前正運行在 ${bot.guilds.cache.size} 個伺服器上!`);
}

module.exports.help = {
  name:"bot"
}
