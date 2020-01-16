const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) {
        let ReturnEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&report <@使用者> <原因>")
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        return message.channel.send(ReturnEmbed)
    }
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
