const {RichEmbed} = require("discord.js");

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
    name: "avatar"
}