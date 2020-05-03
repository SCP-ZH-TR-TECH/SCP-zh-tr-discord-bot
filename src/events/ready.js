module.exports.run = (bot) => {
  console.log(`${bot.user.username} 目前正運行在 ${bot.guilds.size} 個伺服器上!`);
  bot.user.setActivity("SCP 繁中分部", {type: "PLAYING"});
  require("./../utils/initRR.js")(bot);
  if (bot.scp === undefined) { require("./../utils/randarticle.js")(bot); }
}
