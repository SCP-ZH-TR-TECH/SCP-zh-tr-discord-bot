var config = {
  "CMD_PREFIX": "&",
  "DIS_TOKEN": "",
  "DIS_ADM_ROLE": [""],
  "DIS_NEWS_CHAN": [],
  "DIS_ARTI_CHAN": [],
  "SCP_SITE": "zh",
  "GOOGLE_API": "",
  "DIS_VERIFY_TYPE": "wikidotname",
  "SCP_CHECK_TYPE": "exists",
  "DIS_VERIFY_CHAN": "",
  "DIS_VERIFY_MSG": "",
  "DIS_VERIFY_REACT": "",
  "DIS_MEM_ROLE": "",
}
const fs = require("fs");
try {
  let custom = JSON.parse(fs.readFileSync('./utils/devconfig.json', 'utf8'));

  confignames = ["CMD_PREFIX", "DIS_TOKEN", "DIS_ADM_ROLE", "DIS_NEWS_CHAN", "DIS_ARTI_CHAN", "SCP_SITE", "GOOGLE_API", "DIS_VERIFY_TYPE", "SCP_CHECK_TYPE", "DIS_VERIFY_CHAN", "DIS_VERIFY_MSG", "DIS_VERIFY_REACT", "DIS_MEM_ROLE"];
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
  if (process.env.SZB_GOOGLE_API  !==undefined && process.env.SZB_GOOGLE_API  ) { config.GOOGLE_API   = process.env.SZB_GOOGLE_API   };
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
  if (process.env.SZB_DIS_ARTI_CHAN !==undefined && process.env.SZB_DIS_ARTI_CHAN ) {
    if (process.env.SZB_DIS_ARTI_CHAN.startsWith("[")) {
      config.DIS_ARTI_CHAN = JSON.parse(process.env.SZB_DIS_ARTI_CHAN)
    } else { config.DIS_ARTI_CHAN = process.env.SZB_DIS_ARTI_CHAN }
  };
  if (process.env.SZB_DIS_VERIFY_TYPE !==undefined && process.env.SZB_DIS_VERIFY_TYPE ) { config.DIS_VERIFY_TYPE  = process.env.SZB_DIS_VERIFY_TYPE  };
  if (process.env.SZB_SCP_CHECK_TYPE !==undefined && process.env.SZB_SCP_CHECK_TYPE ) { config.SCP_CHECK_TYPE  = process.env.SZB_SCP_CHECK_TYPE  };
  if (process.env.SZB_DIS_VERIFY_CHAN !==undefined && process.env.SZB_DIS_VERIFY_CHAN ) { config.DIS_VERIFY_CHAN  = process.env.SZB_DIS_VERIFY_CHAN  };
  if (process.env.SZB_DIS_VERIFY_MSG !==undefined && process.env.SZB_DIS_VERIFY_MSG ) { config.DIS_VERIFY_MSG  = process.env.SZB_DIS_VERIFY_MSG  };
  if (process.env.SZB_DIS_VERIFY_REACT !==undefined && process.env.SZB_DIS_VERIFY_REACT ) { config.DIS_VERIFY_REACT  = process.env.SZB_DIS_VERIFY_REACT  };
  if (process.env.SZB_DIS_MEM_ROLE !==undefined && process.env.SZB_DIS_MEM_ROLE ) { config.DIS_MEM_ROLE  = process.env.SZB_DIS_MEM_ROLE  };
}



module.exports = config;
