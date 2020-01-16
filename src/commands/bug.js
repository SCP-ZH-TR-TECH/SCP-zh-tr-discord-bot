const {RichEmbed} = require("discord.js");
let ReturnEmbed = new RichEmbed()
    .setColor("#660000")
    .setTitle("用法：")
    .setDescription("&bug <問題指令> <原因(中英文皆可)>")
    .setTimestamp()
    .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

module.exports.run = async (bot, message, args) => {
    if (args.length == 0) return message.channel.send(ReturnEmbed)
    let command = args.shift();
    let reason = args.join(" ");
    if (!reason) return message.channel.send(ReturnEmbed)

    let bugEmbed = new RichEmbed()
    .setDescription("BUG回報")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor("#660000")
    .addField("問題指令", `${command}`)
    .addField("舉報成員", `${message.author} 其成員ID: ${message.author.id}`)
    .addField("於伺服器", message.guild)
    .addField("於頻道", message.channel)
    .addField("於時間", message.createdAt)
    .addField("內容", reason)
    .setTimestamp()

    bot.channels.get(`659022266377568276`).send(bugEmbed)

}

module.exports.help ={
    name: "bug"
}
