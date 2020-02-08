// discord-wikidot user correspondence database
const SQLite = require('better-sqlite3');
const idmDB = new SQLite('./database/idMap.sqlite');

idmDB.pragma("synchronous = 1");
idmDB.pragma("journal_mode = wal");

idmDB.prepare(`CREATE TABLE IF NOT EXISTS idMap (DCID TEXT KEY, WDID TEXT KEY)`).run();

let idMapS = idmDB.prepare(`INSERT OR REPLACE INTO idMap (DCID, WDID) VALUES (@DCID, @WDID);`);
let idMapRD = idmDB.prepare(`DELETE FROM idMap WHERE DCID = ?`);
let idMapRW = idmDB.prepare(`DELETE FROM idMap WHERE WDID = ?`);
let idMapFD = idmDB.prepare(`SELECT WDID FROM idMap WHERE DCID = ?`);
let idMapFW = idmDB.prepare(`SELECT DCID FROM idMap WHERE WDID = ?`);

const mention = /<.{1,2}[0-9]+>/;

module.exports.help = {
  name:"idcr",
  embed: {
    description: `進行wikidot id與Discord用戶對應關係操作。用法：\n&idcr <操作> <用戶> [<用戶>]`
  }
}

module.exports.run = async (bot, message, args) => {
  var subcmd = args[0].toLowerCase();
  args = args.slice(1);
  var dcuser = null, wduser = null;
  if (message.mentions.users.size > 0) {
    dcuser = message.mentions.users.keys().next().value;
  }
  var wdusername = args.filter(arg => !mention.test(arg)).join(" ");
  var wdusers = await bot.__scpper.findUsers(wdusername, {site: null});
  if (wdusers instanceof Map) {
    wdusers = new Map(Array.from(wdusers).filter(each => (each[1].displayName.toLowerCase().trim() === wdusername.toLowerCase())&&(!each[1].deleted)))
  }
  if (wdusers.size > 0) {
    wduser = wdusers.keys().next().value;
    var wduserobj = wdusers.get(wduser);
  }

  switch (subcmd) {
    case "s":
    case "set":
      if (!dcuser||dcuser==undefined) { dcuser = message.author.id; }
      if (!wduser) return message.channel.send(`該wikidot用戶不存在。`);
      //console.log(`dis id: ${dcuser} ; wd id: ${wduser}`)

      try {
        var i = idMapS.run({DCID:dcuser, WDID:wduser});
        if (i.changes) {
          return message.channel.send(`對應關係成功建立：<@${dcuser}> <=> ${wduserobj.displayName} `);
        }
      } catch (e) {
        console.log(e)
      }
      break;

    case "r":
    case "rm":
    case "remove":
      try {
        if (!dcuser||dcuser==undefined) {
          var i = idMapRW.run(wduser);
        } else {
          var i = idMapRD.run(dcuser);
        }
      } catch (e) {
        console.log(e)
      }
      if (i.changes) {
        message.channel.send(`對應關係成功刪除。`);
      } else {
        message.channel.send(`資料庫內並無此人的對應關係。`);
      }
      break;

    case "f":
    case "find":
      try {
        if (!dcuser||dcuser==undefined) {
          var result = idMapFW.get(wduser);
          if (result!=undefined&&result.DCID) {
            return message.channel.send(`${wduserobj.displayName} 的對應者是 <@${result.DCID}>`);
          } else {
            return message.channel.send(`對應關係未錄入。`);
          }
        } else {
          var result = idMapFD.get(dcuser);
          if (result!=undefined&&result.WDID) {
            var wduserobj = await bot.__scpper.getUser(result.WDID);
            return message.channel.send(`<@${dcuser}> 的對應者是 ${wduserobj.displayName}`);
          } else {
            return message.channel.send(`對應關係未錄入。`);
          }
        }
      } catch (e) {
        console.log(e)
      }
      break;

    default:
      return message.channel.send(`指令錯誤。請重新輸入。`)
  }
};
