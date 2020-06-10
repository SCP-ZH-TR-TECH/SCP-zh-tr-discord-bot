const {MessageEmbed} = require("discord.js");

exports.run = async(bot, message, args) => {
    let type = "png"
    if (args.length > 2 && (args[1] != "gif" || args.length == 0)) {
        let ReturnEmbed = new MessageEmbed()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&emoji <表情符號> <預設png，若為gif則輸入gif>", "僅能單次輸入一表情符號")
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        return message.channel.send(ReturnEmbed)
    }
    if (args[1] == "gif") {
        type = "gif"
    }
    let base = args[0]
    base = base.split(":")
    base = base[2].split(">")
    let Emoji = `https://cdn.discordapp.com/emojis/${base[0]}.${type}`
    const avatarEmbed = new MessageEmbed()
    .setTitle("表情符號")
    .setURL(Emoji)
    .setDescription(`表情符號名稱：${args[0]}`)
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#660000")
    .setImage(Emoji);
    message.channel.send(avatarEmbed);
}

module.exports.help ={
    name: "emoji",
    embed: {
      description: `展示表情符號大圖。\n用法: &emoji <表情符號>`
    }
}
