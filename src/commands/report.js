const {EmbedBuilder} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!rUser) {
        let ReturnEmbed = new EmbedBuilder()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&report <@使用者> <原因>")
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        return message.channel.send({embeds: [ReturnEmbed]});
    }
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new EmbedBuilder()
    .setDescription("舉報")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#660000")
    .addFields([
        {name: "被舉報成員", value: `${rUser} 其成員ID: ${rUser.id}`},
        {name: "舉報成員", value: `${message.author} 其成員ID: ${message.author.id}`},
        {name: "於伺服器", value: message.guild.name},
        {name: "於頻道", value: message.channel},
        {name: "於時間", value: message.createdAt},
        {name: "內容", rreason},
    ])
    .setTimestamp()

    message.delete().catch(O_o=>{});
    bot.channels.cache.get(`657899905645543434`).send({embeds: [reportEmbed]});

}

module.exports.help ={
    name: "report",
    embed: {
      description: "向管理員舉報本伺服成員。\n用法: &report <@使用者> <原因>"
    }
}
