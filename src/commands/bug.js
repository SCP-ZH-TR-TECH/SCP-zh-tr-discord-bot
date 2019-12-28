const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let Stuff = message.content.split(' ').slice(1);
    if (Stuff.length == 0) return message.author.send("用法：&bug <問題指令> <原因(中英文皆可)>")
    let command = Stuff.shift();
    let reason = Stuff.join(" ");
    if (!reason) return message.author.send("請充實問題指令敘述")

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
