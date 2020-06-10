var greetmsg = `歡迎您加入SCP-ZH繁中分部的聊天室！新成員 :)\n我是駐守此地的Mos.aic！為了之後相處愉快的每一天\n\n
請確認您已年滿15歲，並認真的讀過<#577140915010011156> 並前往<#645229994657710102>按照興趣領取身分組\n有疑問及遇到困難時請跟名字是紅色的管理員跟鮮黃色的小幫手求助喔\n最後請幫Mo簡單寫一下自我介紹，讓大家認識你哦。\n\nHello, we have some guides in <#626440362268950528> for international friends who don't speak Chinese. You can also get an international role for yourself there.\n\n**Please note you have to confirm that you are __over 15 years old in age.__**`
var intro = `自我介紹：\n\n常用的稱呼？\n有沒有wikidot帳號/ID是什麼？\n學經歷與性別？（可保密）\n對SCP基金會了解多深？\n怎麼入坑的？\n
目前有興趣的事：聊天/翻譯外文作品/進行原創作品/繪製同人圖畫/其他？`

module.exports.run = (bot, member) => {
  if (member.guild.id=="538768424961179649") { bot.channels.cache.get("577144582677200918").send(`<@${member.id}>\n${greetmsg}`); bot.channels.cache.get("577144582677200918").send(`${intro}`) };
}
