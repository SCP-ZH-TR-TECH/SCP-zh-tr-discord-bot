const {RichEmbed} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scpsearch scp-zh-009

module.exports.run = async (bot, message, args) => {
    let SCPStuff = message.content.split(' ').slice(1);
    switch (SCPStuff.length) {
        case 0 :
            return message.channel.send("無法提供網址，用法：&scplink <尾網址> <(繁中則免)/cn/en/int>");
        case 1 :
            SCPStuff.push("zh")
            break
        case 2 :
            break
        default :
            return message.channel.send("無法提供網址，用法：&scp <字串> <(繁中則免)/cn/us/int>");
    }
    let SCPBranch = SCPStuff.pop(); //分部簡寫
    let SCPSearch = SCPStuff.pop();

    if (!(SCPBranch == "zh" || SCPBranch == "en" || SCPBranch == "cn" || SCPBranch == "int")) return message.channel.send("無法提供網址，用法：&scp <字串> <(繁中則免)/cn/us/int>");
    
    switch (SCPBranch) {
        case "zh" :
            SCPStuff.unshift("http://scp-zh-tr.wikidot.com/search:site/a/p/q/")
            SCPStuff.push("內部", "繁中分部")
            break
        case "cn" :
            SCPStuff.unshift("http://scp-wiki-cn.wikidot.com/search:site/a/p/q/")
            SCPStuff.push("外部", "簡中分部")
            break
        case "en" :
            SCPStuff.unshift("http://scp-wiki.wikidot.com/search:site/a/p/q/")
            SCPStuff.push("外部", "本部")
            break
        case "int" :
            SCPStuff.unshift("http://scp-int.wikidot.com/search:site/a/p/q/")
            SCPStuff.push("外部", "國際部")
            break
    }

    let SCPLink = SCPStuff.shift() + SCPSearch

    request(encodeURI(SCPLink), (err, res, body) => {
        if (err) return message.author.send("用法：&scpsearch <字串> <(繁中則免)/cn/us/int>");

        let $ = cheerio.load(body);

        let SCPitem = $('.item');

        let SCPTitles = [], SCPLinks = [], SCPRating = [];

        SCPitem.find('a').slice(0).each((index, element) => {
            SCPTitles.push($(element).text());
        });

        SCPitem.find('a').slice(0).each((index, element) => {
            SCPLinks.push($(element).attr('href'));
        });
    
        switch (SCPTitles.length) {
            case 0 :
                SCPTitles.push("從缺", "從缺", "從缺", "從缺", "從缺");
                SCPLinks.push("從缺", "從缺", "從缺", "從缺", "從缺");
                break;
            case 1 :
                SCPTitles.push("從缺", "從缺", "從缺", "從缺");
                SCPLinks.push("從缺", "從缺", "從缺", "從缺");
                break;
            case 2 :
                SCPTitles.push("從缺", "從缺", "從缺");
                SCPLinks.push("從缺", "從缺", "從缺");
                break;
            case 3 :
                SCPTitles.push("從缺", "從缺");
                SCPLinks.push("從缺", "從缺");
                break;
            case 4 :
                SCPTitles.push("從缺");
                SCPLinks.push("從缺");
                break;
            default :
                break;
        }
    
        let SCPEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle(`SCP基金會繁中分部${SCPStuff.shift()}資料庫`)
            .setDescription(`目前連接至${SCPStuff.shift()}`)
            .setThumbnail("https://i.imgur.com/xKRFpMu.png")
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField("搜尋結果", `以${SCPSearch}搜尋：`)
            .addField(SCPTitles.shift(), SCPLinks.shift(), true)
            .addBlankField()
            .addField(SCPTitles.shift(), SCPLinks.shift(), true)
            .addBlankField()
            .addField(SCPTitles.shift(), SCPLinks.shift(), true)
            .addBlankField()
            .addField(SCPTitles.shift(), SCPLinks.shift(), true)
            .addBlankField()
            .addField(SCPTitles.shift(), SCPLinks.shift(), true)
            .setTimestamp()
            .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
    
            message.channel.send(SCPEmbed);    

    });

}

module.exports.help ={
    name: "search"
}
