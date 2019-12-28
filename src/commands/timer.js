var dp = require('./../utils/durparser.js')

module.exports.run = (bot, message, args) => {
  var t = args[0].toLowerCase();
  args = args.slice(1);
  try {
    if (t.includes(":")) {
      var time = new dp(t, ":");
    } else if (t.includes("h")||t.includes("m")||t.includes("s")) {
      var time = new dp(t, "initial");
    } else {
      return message.channel.send(`格式不正確，請重新輸入。`);
    }
  } catch (e) {
    if (e.code = `INVALID_TIME_REP`) {
      return message.channel.send(`格式不正確，請重新輸入。`);
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
  name:"timer"
}
