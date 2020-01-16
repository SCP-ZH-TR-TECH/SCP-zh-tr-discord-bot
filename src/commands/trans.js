const {RichEmbed} = require("discord.js");
const gTranslate = require("google-translate-node");

var langchecker = ["af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "zh-CN", "zh",
 "zh-TW", "cs", "da", "nl", "en", "eo", "et", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw",
  "he", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky",
   "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ny", "ps",
    "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su",
     "sw", "sv", "tl", "tg", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"]
var langlist = ["ar", "zh", "zh-TW", "cs", "da", "nl", "en", "eo", "fr", "de", "ja", "ko", "la", "ru", "es"];
var displayList = ["阿拉伯文", "中文 (簡體)", "中文 (繁體)", "捷克文", "丹麥文", "荷蘭文", "英文", "國際語文", "法文", "德文", "日文", "韓文", "拉丁文", "俄文", "西班牙文"];

module.exports.run = async(bot, message, args) => {
    if (!args.length) {
        let ReturnEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&trans <字串> <語言代碼>")
            .setTimestamp()
            .setFooter("不知道想要的語言的代碼？試試&trans help吧！", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        return message.channel.send(ReturnEmbed)
    }
    else {
        if (args[0] == "help" && args.length == 1) {
            let ReturnEmbed = new RichEmbed()
                .setTitle("語言代碼一覽")
                .setDescription("還是不知道想要的語言的代碼？去看看[這裡](https://cloud.google.com/translate/docs/languages?hl=zh-tw)吧！")
                .setColor("#660000")
                .setTimestamp()
                .setFooter("Powered by Google Cloud", "http://chaos-module.wdfiles.com/local--files/start/google-icon-for-bot")
            for (let i = 0;langlist.length-1 > i;i++) {
                ReturnEmbed.addField(langlist[i], displayList[i], true);
            }
            return message.channel.send(ReturnEmbed)
        }
    }

    let lang = args.pop();

    if (langchecker.indexOf(lang) == -1) {
        let ReturnEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle("用法：")
            .setDescription("&trans <字串> <語言代碼>")
            .setTimestamp()
            .setFooter("不知道想要的語言的代碼？試試&trans help吧！", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        message.channel.send(ReturnEmbed)
    }

    gTranslate(args.join(" "), lang).then(res => {
        console.log(res)
        let TransEmbed = new RichEmbed()
            .setColor("#660000")
            .setTitle("GOOGLE翻譯")
            .setDescription(`以${args.join(" ")}：`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField(`目標語言` ,`${lang}`)
            .addField(`結果`, `${res}`)
            .setTimestamp()
            .setFooter(`不知道想要的語言的代碼？試試&trans help吧！`, "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
        message.channel.send(TransEmbed);
    }, err => {
        message.channel.send("未知錯誤")
    })
}

module.exports.help ={
    name: "trans"
}