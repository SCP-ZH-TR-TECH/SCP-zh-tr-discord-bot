const {EmbedBuilder} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scpsearch scp-zh-009

module.exports.run = async (bot, message, args) => {
  if (args.length > 0) {
    args = (args[0]).split("/");
    args = args.pop();
  }
  let baseurl = "http://scp-zh-tr.wikidot.com"
  request(`http://scp-zh-tr.wikidot.com/new-stuff-workbanch/fullname/${args}`, (err, res, body) => {
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
    let NewsEmbed = new EmbedBuilder()
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
      for (chan of bot.__config.DIS_NEWS_CHAN) {
        var channel = bot.channels.cache.get(chan);
        if (channel&&channel!=undefined) {
          channel.send({embeds: [NewsEmbed]});
        }
      }
    } else {
      message.channel.send({embeds: [NewsEmbed]});
    }
  })
}

module.exports.help ={
    name: "news",
    embed: {
      description: "展示wikidot上繁中分部最新創建頁面。"
    }
}
