const {RichEmbed} = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

//usage : &scp <SCPitem>
//example : &scp zh-009
//example : &scp 1000

var SCPStuff = ["Springfield Cargo Protection", "Spencer Cartoon Production", "Suspecting Chaos-unity Punchers", "Special Containment Procedures", "Spicy Crust Pizzeria", "Soap from Corpse Products", "Su'ao Cargo port", "Steam Control Panel", "Socks from Colorado Park", "Sony in Collaboration with Pioneer", "Science Confusion Puberty", "Suffering from Coding Panic", "Sam Cannot Paddle"];
//              Komica                          Viken                         Sam                                Komica/SCP itself                 Komica                  Komica                       ChA                 ChA                    ChA                         ChA                                   Dr.V                         ChA                            Sam(obviously)

module.exports.run = (bot, message, args) => {
    let SCPNum = message.content.split(' ').slice(1);    
    if (SCPNum.length > 2) {
      let ReturnEmbed = new RichEmbed()
        .setColor("#660000")
        .setTitle("用法：")
        .setDescription("&scp <SCP編號>")
        .setTimestamp()
        .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
      return message.channel.send(ReturnEmbed)
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

      let newEmbed = new RichEmbed()
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

      message.channel.send(newEmbed)
    })
}

module.exports.help = {
  name:"scp"
}
