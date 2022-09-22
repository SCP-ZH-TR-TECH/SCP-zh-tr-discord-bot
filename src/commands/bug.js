const {EmbedBuilder} = require("discord.js");
let ReturnEmbed = new EmbedBuilder()
    .setColor("#660000")
    .setTitle("用法：")
    .setDescription("&bug <問題指令> <原因(中英文皆可)>")
    .setTimestamp()
    .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

module.exports.run = async (bot, message, args) => {
    if (args.length == 0) return message.channel.send({embeds: [ReturnEmbed]});
    let command = args.shift();
    let reason = args.join(" ");
    if (!reason) return message.channel.send({embeds: [ReturnEmbed]});

    let bugEmbed = new EmbedBuilder()
    .setDescription("BUG回報")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#660000")
    .addFields([
        {name: "問題指令", value: `${command}`},
        {name: "舉報成員", value: `${message.author} 其成員ID: ${message.author.id}`},
        {name: "於伺服器", value: message.guild.name},
        {name: "於頻道", value: message.channel},
        {name: "於時間", value: message.createdAt},
        {name: "內容", reason},
    ])
    .setTimestamp()

    bot.channels.cache.get(`659022266377568276`).send({embeds: [bugEmbed]});

}

module.exports.help ={
    name: "bug"
}
