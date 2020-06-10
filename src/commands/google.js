const {MessageEmbed} = require("discord.js");
const Google = require('relevant-google')
const {GOOGLE_API} = require('./../utils/configLoader.js');
const google = new Google(GOOGLE_API);

module.exports.run = async(bot, message, args) => {
    if(!args.length){
        let ReturnEmbed = new MessageEmbed()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&google <字串>")
            .setTimestamp()
            .setFooter("先行公開指令。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
         return message.channel.send(ReturnEmbed)
    }

    let query = encodeURI(args.join(" "));

    (google.search(query).then(res => {
        let SearchEmbed = new MessageEmbed()
            .setColor("#660000")
            .setTitle("GOOGLE搜尋")
            .setDescription(`以${args.join(" ")}搜尋：`)
            .setAuthor(message.author.username, message.author.avatarURL())
            .addField(`搜尋結果` ,`[${res.title}](${res.link})`)
            .addField(`描述`, `${res.snippet}`)
            .setTimestamp()
            .setFooter("先行公開指令。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        message.channel.send(SearchEmbed);
    }))
}

module.exports.help ={
    name: "google",
    embed: {
      description: `進行Google搜尋。\n用法: &google <字串>`
    }
}
