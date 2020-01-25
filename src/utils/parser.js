const fs = require("fs")
const chanMap = JSON.parse(fs.readFileSync('./utils/chanMap.json', 'utf8'));
const roleMap = JSON.parse(fs.readFileSync('./utils/roleMap.json', 'utf8'));

class Parser {
  constructor(input) {
    this.UserP = /<@!?[0-9]+>/g
    this.ChanP = /<#([0-9]+)>/g;
    this.RoleP = /<@&[0-9]+>/g;
    this.src = /[0-9]+/g;
    this.str = "";
    this.arr = [];
    this.out = null;
    if (input instanceof Array) {
      this.type = 0;
      this.arr = input;
    } else if (typeof input == "string") {
      this.type = 1;
      this.str = input;
    }
  }

  mapChan() {
    if (this.type==1) {
      var str = this.str.toLowerCase()
      if (chanMap.hasOwnProperty(str)) {
        this.out = chanMap[str];
      }
    } else {
      for (var arg of this.arr) {
        if (chanMap.hasOwnProperty(arg)) {
          this.arr[this.arr.indexOf(arg)] = chanMap[arg];
        }
      }
    }
    return this;
  }

  parseChan() {
    if (this.type) {
      this.out = `<#${this.str}>`
    }
    return this;
  }
}

module.exports.parser = Parser;
module.exports.roleMap = roleMap;
