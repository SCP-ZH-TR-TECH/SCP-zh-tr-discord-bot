const {EmbedBuilder} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

exports.run = async(bot, message, args) => {
    if (args.length >= 1) {
      let ReturnEmbed = new EmbedBuilder()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&random")
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
      return message.channel.send({embeds: [ReturnEmbed]});
    }
    request(`http://scp-zh-tr.wikidot.com/random-workbanch/offset/${Math.floor(Math.random() * Math.floor(500))}`, (err, res, body) => {
        let $ = cheerio.load(body);
        let SCPdir = $('.list-pages-item');
        let SCPitem = [];

        A = SCPdir.find('a:first-child').attr('href');
        A = "http://scp-zh-tr.wikidot.com" + A
        B = SCPdir.find('img').attr('src');
        SCPdir.find('th').slice(0).each((index, element) => {
          SCPitem.push($(element).text());
        })

        let randomEmbed = new EmbedBuilder()
        .setColor("#660000")
        .setTitle("SCP基金會繁中分部內部資料庫")
        .setDescription("目前連接至繁中分部")
        .setThumbnail("https://i.imgur.com/xKRFpMu.png")
        .addFields([
          {name: "標題", value: `[${SCPitem[0]}](${A})`, inline: true},
          {name: "現時評分", value: SCPitem[2], inline: true},
          {name: "創建於", value: SCPitem[3], inline: true},
        ])
        .setAuthor(SCPitem[1], B)
        .setTimestamp()
        .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

      message.channel.send({embeds: [randomEmbed]});
    })
}

module.exports.help ={
    name: "random",
    embed: {
      description: "展示wikidot上繁中分部隨機頁面。"
    }
}
