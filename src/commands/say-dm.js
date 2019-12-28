const parser = require("./../utils/parser.js")

module.exports.run = (bot, message, args) => {
  var parse = new parser(args[0]);
  chan = parse.mapChan().out;
  args = args.slice(1);
  var channel = bot.channels.get(chan);
  if (channel!=undefined&&channel) {
    channel.send(args.join(" "));
  }

}

module.exports.help = {
  name:"say"
}
