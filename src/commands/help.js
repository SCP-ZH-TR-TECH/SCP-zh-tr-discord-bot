const {EmbedBuilder} = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var helpembed = new EmbedBuilder()
  .setTitle("繁中分部機器人指令一覽")
  .setDescription("版本：1.2.0")
  .setColor("#660000")
  .addFields([
    {name: "直連", value: "&link <尾網址> <(繁中則免)/cn/en/int>"},
    {name: "站內搜尋", value: "&search <字串> <(繁中則免)/cn/en/int>"},
    {name: "最新作品", value: "&news"},
    {name: "骰子", value: "&rd (Xd)Y(±Z) (<-e/--each/-t/--total>) (<自訂扔骰原因訊息>)"},
    {name: "舉報", value: "&report <@username> <理由>"},
    {name: "機器人簡介", value: "&botinfo"},
    {name: "SCP快速連結", value: "&scp <(分部)-項目編號>"},
    {name: "臭蟲回報", value: "&bug <指令> <敘述>"},
    {name: "計時器", value: "&timer <XX:XX:XX.XXX/XhXmXs> (<自訂提醒訊息>)"},
    {name: "GOOGLE搜尋", value: "&google <字串>"},
    {name: "GOOGLE翻譯", value: "&trans <字串> <語言代碼>"},
    {name: "頭貼", value: "&avatar <(預設為使用者)/@username>"},
    {name: "表情符號", value: "&emoji <表情符號> <(預設png)/gif>"},
  ])
  .setFooter("Powered by SCP ZH-TR Discord Branch", "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/code-512.png");

  if (args.length&&bot.commands.has(args[0].toLowerCase())) {
    var cmd = bot.commands.get(args[0].toLowerCase());
    if (cmd.help.embed&&cmd.help.embed!=undefined) {
      helpembed = new EmbedBuilder(cmd.help.embed)
      .setTitle(`指令: ${bot.__config.CMD_PREFIX}${cmd.help.name}`)
      .setColor("#660000")
      .setFooter("Powered by SCP ZH-TR Discord Branch", "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/code-512.png");;
    }
  }

  message.channel.send({embeds: [helpembed]});
}

module.exports.help = {
  name:"help",
  embed: {
    description: "展示所有可用機器人指令。"
  }
}
