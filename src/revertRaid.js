const Discord = require("discord.js");
const config = require("./utils/configLoader.js");
const bot = new Discord.Client({disableEveryone: true});
bot.__config = config;

bot.login(config.DIS_TOKEN);

setTimeout(()=>{
  bot.guilds.get('635743502432600084').channels.filter(m=>m.type=='text').forEach((chan, i) => {
    console.log(`Fetching from ${chan.id}`)
    chan.fetchMessages()
    .then(map=>map.filter(m=>(m.author.id=='695351278200553583'||m.author.id=='335927254968434690'))
    .forEach((msg, i) => { msg.delete().then(m=>{console.log(`Deleted ${m.id}`)}) }) )
  });
},5000)
