var config = {
  "CMD_PREFIX": "&",
  "DIS_TOKEN": "NDk1NjI1MzE5MjU3MDc5ODM4.XggTnQ.261PSAGSUm1Si0LNycl9PBYYq4c",
  "DIS_ADM_ROLE": [""],
  "DIS_NEWS_CHAN": [],
  "SCP_SITE": "zh",
  "GOOGLE_API": "AIzaSyBxrOme4CLaRidsGrs4PorY2ZYA7cd1s_A"
}
const fs = require("fs");
try {
  let custom = JSON.parse(fs.readFileSync('./utils/devconfig.json', 'utf8'));

  confignames = ["CMD_PREFIX", "DIS_TOKEN", "DIS_ADM_ROLE", "DIS_NEWS_CHAN", "SCP_SITE"];
  for (var name of confignames) { if (custom[name] !== undefined && custom[name]) {config[name] = custom[name]} };
} catch (e) {
  if (e.code==`ENOENT`) {
    console.log(`Local config JSON file not found. Loading environment configs...`)
  } else throw e;
}

if (process.env.SZB_FORCE_ENV === undefined || process.env.SZB_FORCE_ENV.toLowerCase() === "true") {
  if (process.env.SZB_CMD_PREFIX!==undefined && process.env.SZB_CMD_PREFIX) { config.CMD_PREFIX = process.env.SZB_CMD_PREFIX };
  if (process.env.SZB_DIS_TOKEN !==undefined && process.env.SZB_DIS_TOKEN ) { config.DIS_TOKEN  = process.env.SZB_DIS_TOKEN  };
  if (process.env.SZB_SCP_SITE  !==undefined && process.env.SZB_SCP_SITE  ) { config.SCP_SITE   = process.env.SZB_SCP_SITE   };
  if (process.env.SZB_DIS_ADM_ROLE !==undefined && process.env.SZB_DIS_ADM_ROLE ) {
    if (process.env.SZB_DIS_ADM_ROLE.startsWith("[")) {
      config.DIS_ADM_ROLE = JSON.parse(process.env.SZB_DIS_ADM_ROLE)
    } else { config.DIS_ADM_ROLE = process.env.SZB_DIS_ADM_ROLE }
  };
  if (process.env.SZB_DIS_NEWS_CHAN !==undefined && process.env.SZB_DIS_NEWS_CHAN ) {
    if (process.env.SZB_DIS_NEWS_CHAN.startsWith("[")) {
      config.DIS_NEWS_CHAN = JSON.parse(process.env.SZB_DIS_NEWS_CHAN)
    } else { config.DIS_NEWS_CHAN = process.env.SZB_DIS_NEWS_CHAN }
  };
}



module.exports = config;
