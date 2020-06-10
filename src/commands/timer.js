const {MessageEmbed} = require("discord.js");
var dp = require('./../utils/durparser.js')
let ReturnEmbed = new MessageEmbed()
  .setColor("#660000")
  .setTitle("用法：")
  .setDescription("&timer <XX:XX:XX.XXX/XhXmXs> [<自訂提醒訊息>]")
  .setTimestamp()
  .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png");

module.exports.run = (bot, message, args) => {
  var t = args[0].toLowerCase();
  args = args.slice(1);
  try {
    if (t.includes(":")) {
      var time = new dp(t, ":");
    } else if (t.includes("h")||t.includes("m")||t.includes("s")) {
      var time = new dp(t, "initial");
    } else {
      return message.channel.send(ReturnEmbed)
    }
  } catch (e) {
    if (e.code = `INVALID_TIME_REP`) {
      return message.channel.send(ReturnEmbed)
    } else throw e;
  }
  t = time.toMS();
  if (t>3600000) { return message.channel.send(`很抱歉，暫未開放長於一小時的計時器。`); }
  if (!args[0]||args[0]==undefined) {
    var timeoutmsg = `<@${message.author.id}> 提醒: ${time.exp.cn}已到達。`;
  } else {
    var timeoutmsg = `<@${message.author.id}> 提醒: ${args.join(' ')}`;
  }
  message.channel.send(`<@${message.author.id}>，${time.exp.cn}計時器已設置。`);
  setTimeout(()=>{
    message.channel.send(timeoutmsg);
  }, t)
}

module.exports.help = {
  name: "timer",
  embed: {
    description: "設定倒數計時器，並在到達時發送提醒訊息。\n用法: &timer <XX:XX:XX.XXX/XhXmXs> [<自訂提醒訊息>]",
    fields: [
      {
        name: `範例1: &timer 2m576s`,
        value: `設定11分36秒計時器，當時間到達時會發出 "[@用戶] 提醒: 11分36秒已到達" 訊息。`
      },
      {
        name: `範例2: &timer 20:75 範例`,
        value: `設定21分15秒計時器，當時間到達時會發出 "[@用戶] 提醒: 範例" 訊息。`
      },
      {
        name: `範例2: &timer 20:882`,
        value: `時間表達錯誤，無法設定計時器。`
      }
    ]
  }
}
