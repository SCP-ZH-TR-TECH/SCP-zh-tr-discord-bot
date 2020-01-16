const {RichEmbed} = require("discord.js");
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
            let ReturnEmbed = new RichEmbed()
                .setColor("#660000")
                .setTitle("用法：")
                .setDescription("&link <尾網址> <(繁中則免)/cn/en/int>")
                .setTimestamp()
                .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
            return message.channel.send(ReturnEmbed)
    }
    let SCPBranch = SCPStuff.pop();
    if (!(SCPBranch == "zh" || SCPBranch == "en" || SCPBranch == "cn" || SCPBranch == "int")) return message.channel.send("無法提供網址，用法：&link <尾網址> <(繁中則免)/cn/en/int>");

    switch (SCPBranch) {
        case "zh" :
            SCPStuff.unshift("http://scp-zh-tr.wikidot.com/");
            SCPStuff.push("內部", "繁中分部");
            break;
        case "cn" :
            SCPStuff.unshift("http://scp-wiki-cn.wikidot.com/");
            SCPStuff.push("外部", "簡中分部");
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
        else if ($('#page-title').length) {
          var title = $('#page-title').contents().first().text().trim();
          var rating = $('.prw54353').contents().first().text().trim();
          if (title.includes('\n')) { title = title.split('\n').join().trim(); }
          if (!rating||rating==undefined) { rating="從缺" };
          SCPStuff.push(title, rating);
        }

        let SCPEmbed = new RichEmbed()
        .setColor("#660000")
        .setTitle(`SCP基金會繁中分部${SCPStuff.shift()}資料庫`)
        .setDescription(`目前連接至${SCPStuff.shift()}`)
        .setThumbnail("https://i.imgur.com/xKRFpMu.png")
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField("標題", `[${SCPStuff.shift()}](${SCPLink})`, true)
        .addField("現時評分", SCPStuff.shift(), true)
        .setTimestamp()
        .setFooter("若直連結果顯示為*不存在之頁面*代表該頁面尚未被創建。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

        message.channel.send(SCPEmbed);
    });

}

module.exports.help ={
    name: "link"
}
