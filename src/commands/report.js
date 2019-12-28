const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.author.send("無法舉報給管理員，原因：未能找到該使用者。");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new RichEmbed()
    .setDescription("舉報")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor("#660000")
    .addField("被舉報成員", `${rUser} 其成員ID: ${rUser.id}`)
    .addField("舉報成員", `${message.author} 其成員ID: ${message.author.id}`)
    .addField("於伺服器", message.guild)
    .addField("於頻道", message.channel)
    .addField("於時間", message.createdAt)
    .addField("原因", rreason)
    .setTimestamp()

    message.delete().catch(O_o=>{});
    bot.channels.get(`657899905645543434`).send(reportEmbed)

}

module.exports.help ={
    name: "report"
}
