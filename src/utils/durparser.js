module.exports = class DurationParser {
  constructor(duration, format) {
    this.dur = Number(duration);
    this.durstr = ""+duration;
    this.strint = null;
    this.strdec = null;
    this.format = format;
    this.valid = true;
    this.exp = {
      "en": "", "cn": ""
    }
    this.result = {
      "yr":0, "mth":0, "day":0, "hr":0, "min":0, "sec":0, "ms":0
    }
    if (isNaN(this.dur)) {this.dur=0}
    if (this.durstr.includes(".")) {
      this.strint = this.durstr.split(".")[0];
      this.strdec = this.durstr.split(".")[1];
    } else this.strint = this.durstr;

    this.parse();
    this.check();
    this.normalize();
    this.genExp();
  }

  parse() {
    switch (this.format) {
      case "ms":
        if (this.dur) {
          this.result.ms += this.dur%1000;
          this.dur-=this.result.ms;
          this.dur/=1000;
        }
        this.format == "s";
      case "s":
      case "sec":
      case "second":
        if (this.dur) {
          this.result.sec += this.dur%60;
          this.dur-=this.result.sec;
          this.dur/=60;
        }
        this.format == "min";
      case "min":
      case "minute":
        if (this.dur) {
          this.result.min += this.dur%60;
          this.dur-=this.result.min;
          this.dur/=60;
        }
        this.format == "hr";
      case "hr":
      case "hour":
        if (this.dur) {
          this.result.hr += this.dur%24;
          this.dur-=this.result.hr;
          this.dur/=24;
        }
        this.format == "day";
      case "day":
        if (this.dur) {
          this.result.day += this.dur%30;
          this.dur-=this.result.day;
          this.dur/=30;
        }
        this.format == "mth";
      case "mth":
      case "month":
        if (this.dur) {
          this.result.mth += this.dur%365;
          this.dur-=this.result.mth;
          this.dur/=365;
        }
        this.format == "yr";
      case "yr":
      case "year":
        if (this.dur) {
          this.result.yr += this.dur;
        }
        break;
      case "initial":
        var arr = this.durstr;
        if (arr.includes("h")) {
          arr = arr.split("h");
          this.result.hr = parseInt(arr[0]);
          if (arr[1]!=undefined&&arr[1]) { arr = arr[1]; } else { break; }
        }
        if (arr.includes("m")) {
          arr = arr.split("m");
          this.result.min = parseInt(arr[0]);
          if (arr[1]!=undefined&&arr[1]) { arr = arr[1]; } else { break; }
        }
        if (arr.includes("s")) {
          arr = arr.split("s");
          this.result.sec = parseInt(arr[0]);
          if (arr[1]!=undefined&&arr[1]) { arr = arr[1]; } else { break; }
        }
        if (arr!=undefined&&arr) { this.result.ms = arr; }
        break;
      case ":":
        if (this.durstr.includes(":")) {
          var arr = this.durstr.split(":");
          var last = arr.pop()
          if (last.includes(".")) {
            var secsNless = last.split(".");
            arr.push(secsNless[0]);
            this.result.ms = parseInt(secsNless[1].substring(0,3));
          } else { arr.push(last) }
          if (arr.length) {
            var curr = arr.pop()
            if (curr.length==2) {
              this.result.sec = parseInt(curr)
            } else { return this.valid = false }
          }
          if (arr.length) {
            var curr = arr.pop()
            if (curr.length==2) {
              this.result.min = parseInt(curr)
            } else { return this.valid = false }
          }
          if (arr.length) {
            var curr = arr.pop()
            if (curr.length<=2) {
              this.result.hr = parseInt(curr)
            } else { return this.valid = false }
          }
        }
        break;
      default:
        break;
    }
  }

  normalize() {
    if (this.result.ms>=1000) {
      this.result.sec += (this.result.ms - this.result.ms%1000)/1000;
      this.result.ms%=1000;
    }
    if (this.result.sec>=60) {
      this.result.min += (this.result.sec - this.result.sec%60)/60;
      this.result.sec%=60;
    }
    if (this.result.min>=60) {
      this.result.hr += (this.result.min - this.result.min%60)/60;
      this.result.min%=60;
    }
    if (this.result.hr>=24) {
      this.result.day += (this.result.hr - this.result.hr%24)/24;
      this.result.hr%=60;
    }
    if (this.result.day>=30) {
      this.result.mth += (this.result.day - this.result.day%30)/30;
      this.result.day%=30;
    }
    if (this.result.mth>=12) {
      this.result.yr += (this.result.mth - this.result.mth%12)/12;
      this.result.mth%=12;
    }
  }

  check() {
    if (!this.valid) {
      var e = new Error(`Invalid time representation.`);
      e.code = `INVALID_TIME_REP`;
      throw e;
    }
  }

  genExp() {
    var units = ["yr", "mth", "day", "hr", "min", "sec", "ms"]
    var enU = ["Year", "Month", "Day", "Hour", "Minute", "Second", "Milisecond"]
    var cnU = ["年", "月", "日", "時", "分", "秒", "毫秒"]
    for (var unit of units) {
      var curr = this.result[unit];
      var i = units.indexOf(unit);
      if (curr>1) {
        this.exp.en += ` ${curr} ${enU[i]}s`
        this.exp.cn += ` ${curr} ${cnU[i]}`
      } else if (curr>0) {
        this.exp.en += ` ${curr} ${enU[i]}`
        this.exp.cn += ` ${curr} ${cnU[i]}`
      }
    }
  }

  toMS() {
    var ms = this.result.ms;
    if (this.result.sec) { ms+= this.result.sec*1000; }
    if (this.result.min) { ms+= this.result.min*60000; }
    if (this.result.hr) { ms+= this.result.hr*3600000; }
    return ms;
  }

  get chiExp() { return this.exp.cn }
  get engExp() { return this.exp.en }
}
