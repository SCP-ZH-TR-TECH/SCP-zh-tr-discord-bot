const Discord = require("discord.js");
const fs = require("fs");
const config = require("./utils/configLoader.js");
const Scpper = require('scpper2.js');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.admcmds = new Discord.Collection();
bot.dmcmds = new Discord.Collection();
bot.__config = config;
bot.__scpper = new Scpper.Scpper({site:"int"||config.SCP_SITE});

bot.login(config.DIS_TOKEN);

let pref = config.CMD_PREFIX;

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js"
      && f.split("-").pop()!="disabled.js" && f.split("-").pop()!="admin.js")
    let admjsfile = files.filter(f => f.split(".").pop() === "js" && f.split("-").pop()=="admin.js")
    let dmjsfile = files.filter(f => f.split(".").pop() === "js" && f.split("-").pop()=="dm.js")
    if(!(jsfile.length||admjsfile.length||dmjsfile.length)){
      console.log("無法找到可用的指令集");
      return;
    }

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} 已載入!`);
      bot.commands.set(props.help.name, props);
    });
    admjsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} 已載入!`);
      bot.admcmds.set(props.help.name, props);
    });
    dmjsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} 已載入!`);
      bot.dmcmds.set(props.help.name, props);
    });

  });

bot.on("ready", () => {
    console.log(`${bot.user.username} 目前正運行在 ${bot.guilds.size} 個伺服器上!`);
    bot.user.setActivity("SCP 繁中分部", {type: "PLAYING"});
});


bot.on("message", function(msg) {
    if (msg.author.bot && msg.author.id!="268478587651358721") return;
    if (!msg.content.startsWith(pref)) return;
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0].slice(pref.length).toLowerCase();
    let args = msgArray.slice(1);
    for (var i=0; i<args.length; i++) {
      if (args[i]==='') { args.splice(i,1); i--; };
    };

    if (msg.channel.type != "dm") {
      let cmdfile = bot.commands.get(cmd);
      if (cmdfile&&cmdfile!=undefined) { cmdfile.run(bot,msg,args); }

      let admcmdfile = bot.admcmds.get(cmd);
      if (admcmdfile&&admcmdfile!=undefined&&config.DIS_ADM_ROLE!=[]) {
        var access = false;
        for (var role of config.DIS_ADM_ROLE) {
          if (role&&msg.member.roles.has(role)) { access = true; }
        }
        if (!access) {
          msg.channel.send("你沒有使用此指令的權限。");
        } else { admcmdfile.run(bot,msg,args); }
      }
    } else {
      let dmcmdfile = bot.dmcmds.get(cmd);
      if (dmcmdfile&&dmcmdfile!=undefined) {
        var access = bot.guilds.get("656682156701253635");
        if (access!=undefined&&access) {
          access = access.members.get(msg.author.id)
          if (access!=undefined&&access) { dmcmdfile.run(bot,msg,args); }
        }
      }
    }
});
