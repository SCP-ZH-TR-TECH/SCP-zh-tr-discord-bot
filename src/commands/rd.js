const {RichEmbed} = require("discord.js");
var MT = require("mersenne-twister");
var gen = new MT();

module.exports.run = (bot, message, args) => {
  var roll = "1d100", num = 1, side = 100, adjsum = 0;
  if (args.length) {
    if (args[0].startsWith("+")||args[0].startsWith("-"))
    { roll += args.shift().toLowerCase() }
    else { roll = args.shift().toLowerCase() }
  };
  var adjust = roll.match(/[+\-](\d+)/g) || [];
  for (var i = 0; i < adjust.length; i++) { adjsum+=parseInt(adjust[i]) }
  if (roll.includes("d")) {
    num = parseInt(roll.split("d")[0]);
    side = parseInt(roll.split("d")[1]);
  } else { side = parseInt(roll); }

  if (isNaN(num)||isNaN(side)) {
    let ReturnEmbed = new RichEmbed()
      .setColor("#660000")
      .setTitle("用法：")
      .setDescription("&rd XdY±Z", "X為骰子數目，Y為骰子面數，Z為調整數。")
      .setTimestamp()
      .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
    return message.channel.send(ReturnEmbed)
  }
  var sum = 0, all = [], result="";
  for (var i = 0; i < num; i++) {
    var dice = gen.random();
    dice = Math.ceil(dice*side);
    sum += dice;
    all[i] = dice;
  }
  if (adjsum) { adjsum=` = ${sum+adjsum}` } else { adjsum = "" }
  if (all.length >= 15) {
    result = `總和為 ${sum}`
  } else if (all.length <= 1){
    result = `結果為 ${sum}`
  } else {
    result = `結果為 ${all.join(", ")}\n總和為 ${sum}`
  }
  var context = args.join(" ").split("\n")[0];
  if (context&&context!=undefined&&context.length<30) { context= `由於${context}, ` } else { context="" }
  message.channel.send(`${context}<@${message.author.id}> 投出了 ${num}D${side}${adjust.join("")} 骰子: ${result}${adjust.join("")}${adjsum}`);
}

module.exports.help = {
  name:"rd"
}
