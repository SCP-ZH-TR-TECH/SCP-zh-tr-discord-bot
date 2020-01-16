const {RichEmbed} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

exports.run = async(bot, message, args) => {
    if (args.length >= 1) {
      let ReturnEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&random")
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
      return message.channel.send(ReturnEmbed)
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

        let randomEmbed = new RichEmbed()
        .setColor("#660000")
        .setTitle("SCP基金會繁中分部內部資料庫")
        .setDescription("目前連接至繁中分部")
        .setThumbnail("https://i.imgur.com/xKRFpMu.png")
        .addField("標題", "[" + SCPitem.shift() + "](" + A + ")", true)
        .setAuthor(SCPitem.shift(), B)
        .addField("現時評分", SCPitem.shift(), true)
        .addField("創建於", SCPitem.shift(), true)
        .setTimestamp()
        .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

      message.channel.send(randomEmbed)
    })
}

module.exports.help ={
    name: "random"
}