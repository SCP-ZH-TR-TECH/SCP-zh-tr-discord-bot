const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL();
    let botembed = new MessageEmbed()
    .setDescription("機器人資訊")
    .setColor("#660000")
    .setThumbnail(bicon)
    .addField("機器人", bot.user.username)
    .addField("作者", "SCP ZH-TR Discord 研究部門的 ChAoS-UnItY , Joch , Vomiter")
    .addField("創建於", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo",
  embed: {
    description: `展示機器人資訊。`
  }
}
