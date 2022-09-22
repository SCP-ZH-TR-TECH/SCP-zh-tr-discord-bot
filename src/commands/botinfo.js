const {EmbedBuilder} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL();
    let botembed = new EmbedBuilder()
    .setDescription("機器人資訊")
    .setColor("#660000")
    .setThumbnail(bicon)
    .addFields([
      {name: "機器人", value: bot.user.username},
      {name: "作者", value: "SCP ZH-TR Discord 研究部門的 ChAoS-UnItY , Joch , Vomiter"},
      {name: "創建於", value: bot.user.createdAt}
    ]);

    message.channel.send({embeds: [botembed]});
}

module.exports.help = {
  name:"botinfo",
  embed: {
    description: `展示機器人資訊。`
  }
}
