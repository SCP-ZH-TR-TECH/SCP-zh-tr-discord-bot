const {roleMap} = require('./../utils/parser.js');

module.exports.run = (bot, msgR, user) => {
  if (user.bot) return;
  for (var rolechan in roleMap) {
    if (msgR.message.channel.id==roleMap[rolechan].__info.chan && msgR.message.id==roleMap[rolechan].__info.msg) {
      for (var role in roleMap[rolechan]) {
        if (role!="__info" &&
          [msgR.emoji.id, msgR.emoji.identifier, msgR.emoji.name].includes(roleMap[rolechan][role].react)) {
          return msgR.message.guild.member(user).roles.remove(roleMap[rolechan][role].role);
        }
      }
    }
  }
}
