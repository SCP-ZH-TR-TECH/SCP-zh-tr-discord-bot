var MT = require("mersenne-twister");
var gen = new MT();

module.exports.run = (bot, message, args) => {
    var roll = args[0].toLowerCase().split("d");
    if (roll[0]&&roll[0]!=undefined) {
      if (roll[1]&&roll[1]!=undefined) {
        var num = parseInt(roll[0]), side = parseInt(roll[1]);
      } else {
        var num = 1, side = parseInt(roll[0]);
      }
    }
    if (isNaN(num)||isNaN(side)) {
      let ReturnEmbed = new RichEmbed()
        .setColor("#660000")
        .setTitle("用法：")
        .setDescription("&rd XdY", "X為骰子數目，Y為骰子面數。")
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
    if (all.length >= 15) {
      result = `總和為 ${sum}`
    } else if (all.length <= 1){
      result = `結果為 ${sum}`
    } else {
      result = `結果為 ${all.join(", ")}\n總和為 ${sum}`
    }
    message.channel.send(`<@${message.author.id}>, ${num}d${side} 骰子: ${result}`);
}

module.exports.help = {
  name:"rd"
}
