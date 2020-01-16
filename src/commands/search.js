const {RichEmbed} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scpsearch scp-zh-009

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
                .setDescription("&search <字串> <(繁中則免)/cn/us/int>")
                .setTimestamp()
                .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
            return message.channel.send(ReturnEmbed)
    }
    let SCPBranch = SCPStuff.pop(); 
    let SCPSearch = SCPStuff.pop();

    if (!(SCPBranch == "zh" || SCPBranch == "en" || SCPBranch == "cn" || SCPBranch == "int")) return message.channel.send("無法提供網址，用法：&search <字串> <(繁中則免)/cn/us/int>");

    switch (SCPBranch) {
        case "zh" :
            SCPStuff.unshift("http://scp-zh-tr.wikidot.com/search:site/a/p/q/");
            SCPStuff.push("內部", "繁中分部");
            break;
        case "cn" :
            SCPStuff.unshift("http://scp-wiki-cn.wikidot.com/search:site/a/p/q/");
            SCPStuff.push("外部", "簡中分部");
            break;
        case "en" :
            SCPStuff.unshift("http://scp-wiki.wikidot.com/search:site/a/p/q/");
            SCPStuff.push("外部", "本部");
            break;
        case "int" :
            SCPStuff.unshift("http://scp-int.wikidot.com/search:site/a/p/q/");
            SCPStuff.push("外部", "國際部");
            break;
    }

    let SCPLink = SCPStuff.shift() + SCPSearch;

    request(encodeURI(SCPLink), (err, res, body) => {
        let $ = cheerio.load(body);

        let SCPitem = $('.item');

        let SCPTitles = [], SCPLinks = [], SCPRating = [];

        SCPitem.find('a').slice(0).each((index, element) => {
            SCPTitles.push($(element).text());
        });

        SCPitem.find('a').slice(0).each((index, element) => {
            SCPLinks.push($(element).attr('href'));
        });

        if (!SCPTitles.length) {
          SCPTitles.push("無結果");
          SCPLinks.push("從缺");
        };

        let SCPEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle(`SCP基金會繁中分部${SCPStuff.shift()}資料庫`)
            .setDescription(`目前連接至${SCPStuff.shift()}`)
            .setThumbnail("https://i.imgur.com/xKRFpMu.png")
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("搜尋結果", `以${SCPSearch}搜尋：`)
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")

        for (var i = 0; i<5 && SCPTitles.length>0; i++) {
          SCPEmbed.addField(SCPTitles.shift(), SCPLinks.shift(), true)
        }

        message.channel.send(SCPEmbed);

    });

}

module.exports.help ={
    name: "search"
}
