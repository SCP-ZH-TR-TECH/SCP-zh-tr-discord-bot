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

fs.readdir("./events/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(!(jsfile.length)){
      console.log("無法找到可用的事件集");
      return;
    }

    jsfile.forEach((f, i) =>{
      let eventfunc = require(`./events/${f}`);
      let name = f.split(".")[0];
      console.log(`${f} 事件處理器已載入!`);
      bot.on(name, (...args) => eventfunc.run(bot, ...args));
    });
});

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
      console.log(`${f} 指令處理器已載入!`);
      bot.commands.set(props.help.name, props);
    });
    admjsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} 指令處理器已載入!`);
      bot.admcmds.set(props.help.name, props);
    });
    dmjsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} 指令處理器已載入!`);
      bot.dmcmds.set(props.help.name, props);
    });

});


bot.on("message", (msg) => {
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

// uncached message reaction changes event emitter
bot.on('raw', packet => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = bot.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
    channel.fetchMessage(packet.d.message_id).then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
        }
    });
});
