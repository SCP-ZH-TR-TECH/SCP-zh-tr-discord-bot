const {RichEmbed} = require("discord.js");
const request = require("request");
const rp = require("request-promise");
const cheerio = require("cheerio");


module.exports = (bot) => {
  var scp = {
    getRandList: function() {
      request(`http://scp-zh-tr.wikidot.com/random-workbanch/offset/${Math.floor(Math.random() * Math.floor(500))}`, (err, res, body) => {
          let $ = cheerio.load(body);
          let SCPdir = $('.list-pages-item');

          var link = SCPdir.find('a:first-child').attr('href');
          var link = "http://scp-zh-tr.wikidot.com" + link
          var author = [SCPdir.find('img').attr('src'), SCPdir.find('img').attr('alt')];

        if (!link||link==undefined||link.startsWith('http://scp-zh-tr.wikidot.com/old:')) return null;

        request(link, (e,res,body) => {
          if (e) { console.log(e); return null; }
          var $ = cheerio.load(body);
          if (!$('#page-title').length) return null;
          else {
            var rating = $('.prw54353').contents().first().text().trim();
            if (!rating||rating==undefined) { rating="0" };
            rating = parseInt(rating);
            if (rating>=0&&rating<=30) {
              if (scp.pagelist.length<10) { scp.pagelist.push(link); scp.authorlist.push(author); }
              else { scp.pagelist.shift(); scp.pagelist.push(link); scp.authorlist.shift(); scp.authorlist.push(author); }
            }
          }
        })
      })
    },
    getRecEmbed: async function(page) {
      let randomEmbed = new RichEmbed()
      var $ = await rp({ uri:page, transform: function (body) { return cheerio.load(body); }})
      if (!$('#page-title').length) return null;
      else {
        var title = $('#page-title').contents().first().text().trim();
        var rating = $('.prw54353').contents().first().text().trim();
        if (title.includes('\n')) { title = title.split('\n').join().trim(); }
        var pno = Math.floor(Math.random()*($('#page-content').children('p').length))
        var extract = $($('#page-content').children('p').get(pno)).text();
        var author = scp.authorlist.shift()
        randomEmbed.setColor("#660000")
        .setTitle("SCP基金會繁中分部內部資料庫")
        .setDescription("目前連接至繁中分部")
        .setThumbnail("https://i.imgur.com/xKRFpMu.png")
        .addField("標題", "[" + title + "](" + page + ")", true)
        .setAuthor(author[1], author[0])
        .addField("現時評分", rating, true)
        .addField("摘錄", extract, true)
        .setTimestamp()
        .setFooter("不穩定指令，若有問題請回報。", "https://cdn4.iconfinder.com/data/icons/glyphlibrary-one/100/warning-circle-512.png")
      }
      return randomEmbed;
    },
    sendRec: async function() {
      var d = new Date();
      var hr = (d.getUTCHours()+8)%24;
      if (hr<1||hr>=9) {
        var msg = await scp.getRecEmbed(scp.pagelist.shift());
        for (chan of bot.__config.DIS_ARTI_CHAN) { bot.channels.get(chan).send(msg) }
      }
    },
    pagelist: [],
    authorlist: []
  };


  scp.getRandList();

  setTimeout(scp.sendRec,10000)

  scp.id = {
    rec: setInterval(scp.sendRec, 18000000),
    list: setInterval(scp.getRandList, 300000)
  }
}
