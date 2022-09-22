const {EmbedBuilder} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scp <SCPitem>
//example : &scp zh-009
//example : &scp 1000

var SCPStuff = ["Springfield Cargo Protection", "Spencer Cartoon Production", "Suspecting Chaos-unity Punchers", "Special Containment Procedures", "Spicy Crust Pizzeria", "Soap from Corpse Products", "Su'ao Cargo port", "Steam Control Panel", "Socks from Colorado Park", "Sony in Collaboration with Pioneer", "Science Confusion Puberty", "Suffering from Coding Panic", "Sam Cannot Paddle", "Semibreve Cooking Pabulum", "Super Coffin Predator"];
//              Komica                          Viken                         Sam                                Komica/SCP itself                 Komica                  Komica                       ChA                 ChA                    ChA                         ChA                                   Dr.V                         ChA                            Sam(obviously)        Semibreve(obviously)         Unknown

module.exports.run = (bot, message, args) => {
    let SCPNum = message.content.split(' ').slice(1);
    if (SCPNum.length > 2) {
      let ReturnEmbed = new EmbedBuilder()
        .setColor("#660000")
        .setTitle("用法：")
        .setDescription("&scp <SCP編號>")
        .setTimestamp()
        .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
      return message.channel.send({embeds: [ReturnEmbed]});
    }
    if (SCPNum.length == 0) return message.channel.send(SCPStuff[Math.floor((Math.random() * (SCPStuff.length+1)))])
    let SCPitem = []; //Title / Author / Author Avatar / Rating / Date
    let baseurl = "http://scp-zh-tr.wikidot.com/new-stuff-workbanch/fullname/scp-" + SCPNum
    request(baseurl, (err, res, body) => {
      let $ = cheerio.load(body);
      let SCPdir = $('.list-pages-item');

        A = SCPdir.find('a:first-child').attr('href');
        A = "http://scp-zh-tr.wikidot.com" + A
        B = SCPdir.find('img').attr('src');
        SCPdir.find('th').slice(0).each((index, element) => {
          SCPitem.push($(element).text());
        })

        if (typeof B === 'undefined') B = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/200px-Icon-round-Question_mark.svg.png"
        if (SCPitem[1] == "從缺") SCPitem[1] = "未知"

      let newEmbed = new EmbedBuilder()
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

      message.channel.send({embeds: [newEmbed]});
    })
}

module.exports.help = {
  name:"scp",
  embed: {
    description: "隨機回應縮寫為SCP的詞語，或提供項目鏈接。\n用法: &scp 或 &scp <項目編號>",
    fields: [
      {
        name: `範例: &scp zh-002`,
        value: `返回SCP-ZH-002頁面鏈接以及現時評分。`
      }
    ]
  }
}
