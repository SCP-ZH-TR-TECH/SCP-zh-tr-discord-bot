const {roleMap} = require('./parser.js');

module.exports = async (bot) => {
  for (var rolechan in roleMap) {
    if (roleMap[rolechan].__info.msg) {
      var msgcontent = [`${roleMap[rolechan].__info.content}\n`];
      var msg = await bot.channels.cache.get(roleMap[rolechan].__info.chan).messages.fetch(roleMap[rolechan].__info.msg)
      for (var role in roleMap[rolechan]) {
        if (role!="__info") {
          if (roleMap[rolechan][role].reactname) {
            msgcontent.push(`<:${roleMap[rolechan][role].reactname}:${roleMap[rolechan][role].react}>: \`${roleMap[rolechan][role].rolename}\``);
            msg.react(msg.guild.emojis.cache.get(roleMap[rolechan][role].react));
          } else {
            msgcontent.push(`${roleMap[rolechan][role].react}: \`${roleMap[rolechan][role].rolename}\``);
            msg.react(roleMap[rolechan][role].react);
          }
        }
      }
      msg.edit(msgcontent.join("\n\n"))
    }
  }
}
