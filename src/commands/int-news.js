const {MessageEmbed} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scpsearch scp-zh-009

module.exports.run = async (bot, message, args) => {
  if (message.author.id!="268478587651358721") {
    message.channel.send("錯誤，權限不足。")
    return
  }
  let baseurl = "http://scp-int.wikidot.com/"
  request(`http://scp-int.wikidot.com/vomiter-s-page`, (err, res, body) => {
    let A,B;
    if (err) return message.channel.send("Error:" + err);
    let $ = cheerio.load(body);
    let stuff = [];
    let SCPitem = $('.list-pages-item');
    A = SCPitem.find('a:first-child').attr('href');
    B = SCPitem.find('img').attr('src');
    SCPitem.find('th').slice(0).each((index, element) => {
        stuff.push($(element).text());
    });
    let NewsEmbed = new MessageEmbed()
      .setColor("#660000")
      .setTitle("SCP基金會繁中分部內部資料庫")
      .setDescription("目前連接至繁中分部")
      .setThumbnail("https://i.imgur.com/xKRFpMu.png")
      .addFields([
        {name: "標題", value: `[${stuff[0]}](${baseurl}${A})`, inline: true},
        {name: "現時評分", value: stuff[2], inline: true},
        {name: "創建於", value: stuff[3], inline: true},
      ])
      .setAuthor(stuff[1], B)
      .setTimestamp()
      .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

    if (message.author.id=="268478587651358721") {
        var channel = bot.channels.cache.get("678162088283078656");
        if (channel&&channel!=undefined) {
          channel.send(NewsEmbed);
        }
    } else {
      message.channel.send(NewsEmbed);
    }
  })
}

module.exports.help ={
    name: "int-news",
    embed: {
      description: "展示wikidot上繁中分部最新創建頁面。"
    }
}