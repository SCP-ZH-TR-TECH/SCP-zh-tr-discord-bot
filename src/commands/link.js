const {EmbedBuilder} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scplink scp-zh-009 => http://scp-zh-tr.wikidot.com/scp-zh-009
//usage : &scplink scp-4444 us => http://www.scp-wiki.net/scp-4444
//usage : &scplink scp-cn-001 cn => http://scp-wiki-cn.wikidot.com/scp-cn-001

module.exports.run = async (bot, message, args) => {
    let SCPStuff = args;
    switch (SCPStuff.length) {
        case 1 :
            SCPStuff.push("zh");
            break;
        case 2 :
            break;
        default :
            let ReturnEmbed = new EmbedBuilder()
                .setColor("#660000")
                .setTitle("用法：")
                .setDescription("&link <尾網址> <(繁中則免)/cn/en/int>")
                .setTimestamp()
                .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
            return message.channel.send({embeds: [ReturnEmbed]});
    }
    let SCPBranch = SCPStuff.pop();
    if (!["zh", "en", "cn", "int"].includes(SCPBranch)) return message.channel.send("無法提供網址，用法：&link <尾網址> <(繁中則免)/cn/en/int>");

    switch (SCPBranch) {
        case "zh" :
            SCPStuff.unshift("http://scp-zh-tr.wikidot.com/");
            SCPStuff.push("內部", "繁中分部");
            break;
        case "cn" :
            SCPStuff.unshift("http://scp-wiki-cn.wikidot.com/");
            SCPStuff.push("外部", "中文分部");
            break;
        case "en" :
            SCPStuff.unshift("http://scp-wiki.wikidot.com/");
            SCPStuff.push("外部", "本部");
            break;
        case "int" :
            SCPStuff.unshift("http://scp-int.wikidot.com/");
            SCPStuff.push("外部", "國際部");
            break;
    }

    let SCPLink = SCPStuff.shift() + SCPStuff.shift();

    request(SCPLink, (err, res, body) => {
        let $ = cheerio.load(body);

        if (!$('#page-title').length) SCPStuff.push("不存在之頁面", "從缺")
        else {
          var title = $('#page-title').contents().first().text().trim();
          var rating = $('#prw54355').contents().first().text().trim();
          if (title.includes('\n')) { title = title.split('\n').join().trim(); }
          if (!rating||rating==undefined) { rating="從缺" };
          SCPStuff.push(title, rating);
        }

        let SCPEmbed = new EmbedBuilder()
        .setColor("#660000")
        .setTitle(`SCP基金會繁中分部${SCPStuff.shift()}資料庫`)
        .setDescription(`目前連接至${SCPStuff.shift()}`)
        .setThumbnail("https://i.imgur.com/xKRFpMu.png")
        .setAuthor(message.author.username, message.author.avatarURL())
        .addFields([
          {name: "標題", value: `[${SCPStuff[0]}](${SCPLink})`, inline: true},
          {name: "現時評分", value: SCPStuff[1], inline: true},
        ])
        .setTimestamp()
        .setFooter("若直連結果顯示為*不存在之頁面*代表該頁面尚未被創建。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

        message.channel.send({embeds: [SCPEmbed]});
    });

}

module.exports.help ={
    name: "link",
    embed: {
      description: `提供wikidot頁面連接與資訊。\n用法: &link <頁面UNIX名> [<分部>]`,
      fields: [
        {
          name: `目前可用分部`,
          description: `en, int, cn, zh`
        },
        {
          name: `範例: &link scp-cn-1000 int`,
          value: `http://scp-int.wikidot.com/scp-cn-1000 鏈接以及現時評分將被提供。`
        }
      ]
    }
}
