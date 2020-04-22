const {RichEmbed} = require("discord.js");

//TODO no tagging to get other's avatar
exports.run = async(bot, message, args) => {
    let User = message.mentions.users.first() || message.author;
    const avatarEmbed = new RichEmbed()
    .setTitle("頭貼")
    .setURL(User.avatarURL)
    .setDescription(`頭像主人：${User}`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor("#660000")
    .setImage(User.avatarURL);
    message.channel.send(avatarEmbed);

}

module.exports.help ={
    name: "avatar",
    embed: {
      description: `展示頭像大圖。\n用法: &avatar [@用戶]\n若未指定用戶，則默認為指令使用者。`
    }
}
