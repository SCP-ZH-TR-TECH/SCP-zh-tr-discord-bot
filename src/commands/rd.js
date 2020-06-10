const {MessageEmbed} = require("discord.js");
var MT = require("mersenne-twister");
var gen = new MT();

module.exports.run = (bot, message, args) => {
  var roll = "1d100", num = 1, side = 100, adjsum = 0, flag = "-t";
  if (args.length) {
    if (args[0].startsWith("+")||args[0].startsWith("-"))
    { roll += args.shift().toLowerCase() } else { roll = args.shift().toLowerCase() }
    if (args.length&&["-e", "--each", "-t", "--total"].includes(args[0].toLowerCase()))
    { flag = args.shift().toLowerCase() }
  };
  var adjust = roll.match(/[+\-](\d+)/g) || [];
  for (var i = 0; i < adjust.length; i++) { adjsum+=parseInt(adjust[i]) }
  if (roll.includes("d")) {
    num = parseInt(roll.split("d")[0]);
    side = parseInt(roll.split("d")[1]);
  } else { side = parseInt(roll); }

  if (isNaN(num)||isNaN(side)) {
    let ReturnEmbed = new MessageEmbed()
      .setColor("#660000")
      .setTitle("用法：")
      .setDescription("&rd XdY±Z (F)", "X為骰子數目，Y為骰子面數，Z為調整數，F為調整選項。")
      .addField(`調整選項: "-e" / "--each"`, `調整數作用在每個單獨的骰子結果上。`)
      .addField(`調整選項: "-t" / "--total"`, `調整數作用在骰子結果總和上。`)
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
  if (adjsum) {
    switch (flag) {
      case "-e":
      case "--each":
        adjsum=`, 每個骰子${adjust.join("")} = ${sum+adjsum*num}`
        break;
      case "-t":
      case "--total":
      default:
        adjsum=`${adjust.join("")} = ${sum+adjsum}`
        break;
    }
  } else { adjsum = "" }
  if (all.length >= 15) {
    result = `總和為 ${sum}`
  } else if (all.length <= 1){
    result = `結果為 ${sum}`
  } else {
    result = `結果為 ${all.join(", ")}\n總和為 ${sum}`
  }
  var context = args.join(" ").split("\n")[0];
  if (context&&context!=undefined&&context.length<30) { context= `由於${context}, ` } else { context="" }
  message.channel.send(`${context}<@${message.author.id}> 投出了 ${num}D${side}${adjust.join("")} 骰子: ${result}${adjsum}`);
}

module.exports.help = {
  name:"rd",
  embed: {
    description: `扔骰子。\n用法: &rd [<骰子數目>d]<骰子面數>[±<調整數>] [<調整選項>] [<自訂扔骰子原因訊息>]\n調整選項預設為"-t"。`,
    fields: [
      {
        name: `調整選項: "-e" / "--each"`,
        value: `調整數作用在每個單獨的骰子結果上。`
      },
      {
        name: `調整選項: "-t" / "--total"`,
        value: `調整數作用在骰子結果總和上。`
      },
      {
        name: `範例: &rd 2d30+20 -e 範例`,
        value: `回應: \n由於範例, (用戶) 投出了 2D30+20 骰子: 結果為 11, 12\n總和為 23, 每個骰子+20 = 63`
      }
    ]
  }
}
