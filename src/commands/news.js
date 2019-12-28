const {RichEmbed} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scpsearch scp-zh-009

module.exports.run = async (bot, message, args) => {
    let baseurl = "http://scp-zh-tr.wikidot.com"
    request("http://scp-zh-tr.wikidot.com/new-stuff-workbanch", (err, res, body) => {
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
        let NewsEmbed = new RichEmbed()
        .setColor("#660000")
        .setTitle("SCP基金會繁中分部內部資料庫")
        .setDescription("目前連接至繁中分部")
        .setThumbnail("https://i.imgur.com/xKRFpMu.png")
        .addField("標題", "[" + stuff.shift() + "](" + baseurl + A + ")", true)
        .setAuthor(stuff.shift(), B)
        .addField("現時評分", stuff.shift(), true)
        .addField("創建於", stuff.shift(), true)
        .setTimestamp()
        .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

        if (message.author.id=="268478587651358721") {
          for (chan of bot.__config.DIS_NEWS_CHAN) {
            var channel = bot.channels.get(chan);
            if (channel&&channel!=undefined) {
              channel.send(NewsEmbed);
            }
          }
        } else {
          message.channel.send(NewsEmbed);
        }
    })
}

module.exports.help ={
    name: "news"
}
