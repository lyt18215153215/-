/*
* 整理 by hongduo
* create 2013-7-17
* update 2013-7-25
*/
; var console = console || { log: function () { return; } }
; String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};
/**
* 让日期和时间按照指定的格式显示的方法
* @method date
* @memberOf format
* @param {String} format 格式字符串
* @return {String} 返回生成的日期时间字符串
* 
* @example
*     var d = new Date();
*     // 以 YYYY-MM-dd hh:mm:ss 格式输出 d 的时间字符串
*     d.formatDate(d, "YYYY-MM-DD hh:mm:ss");
* 
*/
Date.prototype.formatDate = function (pattern) {
    /*
    * eg:pattern="YYYY-MM-DD hh:mm:ss";
    */
    var o = {
        "W+": this.getDay() == 0 ? 7 : this.getDay(),    //week
        "M+": this.getMonth() + 1,    //month
        "D+": this.getDate(),    //day
        "d+": this.getDate(),    //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),    //minute
        "s+": this.getSeconds(),    //second
        "q+": Math.floor((this.getMonth() + 3) / 3),    //quarter
        "S": this.getMilliseconds(),    //millisecond
        "f+": this.getMilliseconds()
    }

    if (/(Y+)/.test(pattern) || /(y+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(pattern)) {
            pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return pattern;
};

/*
* @beginDate 开始日期,日期格式:yyyy-mm-dd
* @endDate 结束日期,日期格式:yyyy-mm-dd
*/
Date.prototype.Sub = function (beginDate) {
    var timeSpan = {};
    var subDate = new Date(Math.abs(this - beginDate));//相差的毫秒数
    timeSpan.Years = parseInt(subDate.getFullYear() - 1970);
    timeSpan.Months = parseInt(subDate.getMonth() + 1);
    timeSpan.Days = parseInt(subDate.getDate());
    return timeSpan;
}

/*
* @number 需要加的数字
* @interval yyyy:年,MM:月,dd:日,hh:小时,mm:分钟,ss:秒
*/
Date.prototype.Add = function (number, interval) {
    switch (interval) {
        case "yyyy":
        case "yy":
        case "YYYY":
        case "year":
            this.setFullYear(this.getFullYear() + number);
            break;
        case "WW":
        case "weak":
            this.setDate(this.getDay() + number * 7);
            break;
        case "MM":
        case "month":
            this.setMonth(this.getMonth() + number + 1);
            break;
        case "dd":
        case "day":
            this.setDate(this.getDate() + number);
            break;
        case "HH":
        case "hour":
            this.setHours(this.getHours() + number);
            break;
        case "mm":
        case "minute":
            this.setMinutes(this.getMinutes() + number);
            break;
        case "ss":
        case "second":
            this.setSeconds(this.getSeconds() + number);
            break;
        case "ms":
        case "ffff":
            this.setMilliseconds(this.getMilliseconds() + number);
            break;

    }

    var now = this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();

    return (new Date(now));
}
Date.prototype.DateDayDiff = function (sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式   
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[0], parseInt(aDate[1]) - 1, aDate[2]); //转换为12-18-2002格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[0], parseInt(aDate[1]) - 1, aDate[2]);
    iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;
};



String.prototype.formatDate = function (pattern) {
    return new Date(Date.parse(this)).formatDate(pattern);
};

String.prototype.startWith = function (s) {
    return this.slice(0, s.length) == s;
};

String.prototype.endWith = function (s) {
    return this.slice(-s.length) == s;
};

String.prototype.Trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, "");
};
/**
* 清除字符串开头和结尾的空格，并把字符串之间的多个空格转换为一个空格
* 
* @memberOf string
* 
* @return {String} 返回清除后的字符串
*/
String.prototype.clean = function () {
    return trim(this.replace(/\s+/g, ' '));
};
/*** 统计指定字符出现的次数 ***/
String.prototype.Occurs = function (ch) {
    //var re = eval("/[^"+ch+"]/g");
    //return this.replace(re, "").length;
    return this.split(ch).length - 1;
}

/*** 检查是否由数字组成 ***/
String.prototype.isDigit = function () {
    var s = this.Trim();
    return (s.replace(/\d/g, "").length == 0);
}

/*** 检查是否由数字字母和下划线组成 ***/
String.prototype.isAlpha = function () {
    return (this.replace(/\w/g, "").length == 0);
}
/*** 检查是否为数 ***/
String.prototype.isNumber = function () {
    var s = this.Trim();
    return (s.search(/^[+-]?[0-9.]*$/) >= 0);
}
/*** 返回字节数 ***/
String.prototype.byteLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
}
/*** 检查是否包含汉字 ***/
String.prototype.isInChinese = function () {
    return (this.length != this.replace(/[^\x00-\xff]/g, "**").length);
}
/*** 判断空，不建议使用 ***/
String.prototype.isEmpty = function () {
    return (this == "undefined") || this == undefined || this == null || this.Trim() === "";
}
/**
    * @memberOf format
    * @method number
    * 格式化数字显示方式
    * @param num 要格式化的数字
    * @param pattern 格式
    * @example 
    * J.format.number(12345.999,'#,##0.00');
    *  //out: 12,34,5.99
    * J.format.number(12345.999,'0'); 
    *  //out: 12345
    * J.format.number(1234.888,'#.0');
    *  //out: 1234.8
    * J.format.number(1234.888,'000000.000000');
    *  //out: 001234.888000
    */
String.prototype.formatNumber = function (pattern) {
    var strarr = this ? this.toString().split('.') : ['0'];
    var fmtarr = pattern ? pattern.split('.') : [''];
    var retstr = '';

    // 整数部分
    var str = strarr[0];
    var fmt = fmtarr[0];
    var i = str.length - 1;
    var comma = false;
    for (var f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
            case '':
                if (i >= 0)
                    retstr = str.substr(i--, 1) + retstr;
                break;
            case '0':
                if (i >= 0)
                    retstr = str.substr(i--, 1) + retstr;
                else
                    retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr = ',' + retstr;
                break;
        }
    }
    if (i >= 0) {
        if (comma) {
            var l = str.length;
            for (; i >= 0; i--) {
                retstr = str.substr(i, 1) + retstr;
                if (i > 0 && ((l - i) % 3) == 0)
                    retstr = ',' + retstr;
            }
        } else
            retstr = str.substr(0, i + 1) + retstr;
    }

    retstr = retstr + '.';
    // 处理小数部分
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (var f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
            case '':
                if (i < str.length)
                    retstr += str.substr(i++, 1);
                break;
            case '0':
                if (i < str.length)
                    retstr += str.substr(i++, 1);
                else
                    retstr += '0';
                break;
        }
    }
    return retstr.replace(/^,+/, '').replace(/\.$/, '');
};

/*
* Teein 公用方法
* 
*/
var Teein = (window['Teein'] || {});

/**
    * 生成随机数的方法
    * 
    * @method random
    * @memberOf Jx.prototype
    * 
    * @param {Number} min 生成随机数的最小值
    * @param {Number} max 生成随机数的最大值
    * @return {Number} 返回生成的随机数
    */
Teein.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

Teein.isEmpty = function (s) {
    return (typeof (s) == "undefined") || s == undefined || s == null || Teein.toString(s).Trim() === "";
}

Teein.isNumber = function (s) {
    return /\d+/.test(s);
}

Teein.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return "";
}

/**
    * 从第一个函数开始try，直到尝试出第一个可以成功执行的函数就停止继续后边的函数，并返回这个个成功执行的函数结果
    * 
    * @method $try
    * @memberOf Jx.prototype
    * 
    * @param {Function} fn1, fn2, .... 要尝试的函数
    * @return {Mixed} 返回第一个成功执行的函数的返回值
    * 
    * @example
    * Jx().$package(function(J){
    *     // 按顺序执行 funcA, funcB, funcC，当中途有一个 func 的执行结果返回 true 则不再往下执行，并返回成功执行的 func 的返回值；
    *     J.$try("funcA", "funcB", "funcC");
    * };
    */
Teein.$try = function () {
    var i,
        l = arguments.length,
        result;

    for (i = 0; i < l; i++) {
        try {
            if (arguments[i].endWith("()"))
                result = eval(arguments[i]);
            else
                result = eval(arguments[i] + "()");

            // 如果上边语句执行成功则执行break跳出循环
            if (result) break;
        } catch (e) {
            continue;
            //alert("C.错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
        }
    }
    return result;
};

/**
    * 获取当前时间的函数
    * 
    * @method now
    * @memberOf Jx.prototype
    * 
    * 
    * 
    * @example
    * alert(J.now());
    * 
    */
Teein.now = function () {
    return +new Date;
}


/**
    * 一个空函数函数
    * 
    * @memberOf Jx.prototype
    */
Teein.emptyFunc = function () { };

/**
    * 将任意变量转换为字符串的方法
    * 
    * @method toString
    * @memberOf string
    * 
    * @param {Mixed} o 任意变量
    * @return {String} 返回转换后的字符串
    */
Teein.toString = function (o) {
    return (o + "");
};


/**
    * @ignore
    */
Teein.isURL_RE = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
/**
    * 判断是否是一个可接受的 url 串
    * 
    * @method isURL
    * @memberOf string
    * 
    * @param {String} s 要检测的字符串
    * @return {Boolean} 如果是可接受的 url 则返回 true
    */
Teein.isURL = function (s) {
    return this.isURL_RE.test(s);
};

/**
    * @ignore
    */
Teein.parseURL_SPEC = ['scheme', 'user', 'pass', 'host', 'port', 'path', 'query', 'fragment'];
Teein.parseURL_RE = /^([^:]+):\/\/(?:([^:@]+):?([^@]*)@)?(?:([^/?#:]+):?(\d*))([^?#]*)(?:\?([^#]+))?(?:#(.+))?$/;

/**
    * 分解 URL 为一个对象，成员为：scheme, user, pass, host, port, path, query, fragment
    * 
    * @method parseURL
    * @memberOf string
    * 
    * @param {String} str URL 地址
    * @return {Object} 如果解析失败则返回 null
    */
Teein.parseURL = function (str) {
    var ret = null;

    if (null !== (ret = this.parseURL_RE.exec(str))) {
        var specObj = {};
        for (var i = 0, j = this.parseURL_SPEC.length; i < j ; i++) {
            var curSpec = this.parseURL_SPEC[i];
            specObj[curSpec] = ret[i + 1];
        }
        ret = specObj;
        specObj = null;
    }

    return ret;
};


/**
    * 将 uri 的查询字符串参数映射成对象
    * 
    * @method mapQuery
    * @memberOf string
    * 
    * @param {String} uri 要映射的 uri
    * @return {Object} 按照 uri 映射成的对象
    * 
    * @example
    * Jx().$package(function(J){
    *  var url = "http://web.qq.com/?qq=4765078&style=blue";
    *  // queryObj 则得到一个{qq:"4765078", style:"blue"}的对象。
    *  var queryObj = J.mapQuery(url);
    * };
    */
Teein.mapQuery = function (uri) {
    //window.location.search
    var i,
        key,
        value,
        uri = uri && uri.split('#')[0] || window.location.search, //remove hash
        index = uri.indexOf("?"),
        pieces = uri.substring(index + 1).split("&"),
        params = {};
    if (index === -1) {//如果连?号都没有,直接返回,不再进行处理. az 2011/5/11
        return params;
    }
    for (i = 0; i < pieces.length; i++) {
        try {
            index = pieces[i].indexOf("=");
            key = pieces[i].substring(0, index);
            value = pieces[i].substring(index + 1);
            if (!(params[key] = unescape(value))) {
                throw new Error("uri has wrong query string when run mapQuery.");
            }
        }
        catch (e) {
            //J.out("错误：[" + e.name + "] "+e.message+", " + e.fileName+", 行号:"+e.lineNumber+"; stack:"+typeof e.stack, 2);
        }
    }
    return params;
};


/**
    * 判断是否含有指定的字符串
    * 
    * @memberOf string
    * @name contains
    * @function
    * @param {String} string 是否含有的字符串
    * @param {String} separator 分隔符，可选
    * @return {Boolean} 如果含有，返回 true，否则返回 false
    */
Teein.contains = function (string1, string2, separator) {
    return (separator) ? (separator + string1 + separator).indexOf(separator + string2 + separator) > -1 : string1.indexOf(string2) > -1;
};


/**
    * 将“-”连接的字符串转换成驼峰式写法
    * 
    * @memberOf string
    * 
    * @return {String} 返回转换后的字符串
    */
Teein.camelCase = function (string) {
    return string.replace(/-\D/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
};

/**
    * 将驼峰式写法字符串转换成“-”连接的
    * 
    * @memberOf string
    * 
    * @return {String} 返回转换后的字符串
    */
Teein.hyphenate = function (string) {
    return string.replace(/[A-Z]/g, function (match) {
        return ('-' + match.charAt(0).toLowerCase());
    });
};


/**
    * 将字符串转换成全大写字母（首字母）
    * 
    * @memberOf string
    * 
    * @return {String} 返回转换后的字符串
    */
Teein.capitalize = function (string) {
    return string.replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
    });
};

/**
    * 将字符串转换成整数
    * 
    * @memberOf string
    * 
    * @return {Number} 返回转换后的整数
    */
Teein.toInt = function (string, base) {
    return parseInt(string, base || 10);
};


/**
    * 将带换行符的字符串转换成无换行符的字符串
    * 
    * @memberOf string
    * @param {Sring} str 要转换的字符串
    * @return {Sring} 返回转换后的字符串
    */
Teein.toSingleLine = function (str) {
    return String(str).replace(/\r/gi, "")
                        .replace(/\n/gi, "");
};


/**
    * 将字符串转换成html源码
    * 
    * @memberOf string
    * @param {Sring} str 要转换的字符串
    * @return {Sring} 返回转换后的html代码字符串
    */
Teein.toHtml = function (str) {
    return String(str).replace(/&/gi, "&amp;")
                        .replace(/\\/gi, "&#92;")
                        .replace(/\'/gi, "&#39;")
                        .replace(/\"/gi, "&quot;")
                        .replace(/</gi, "&lt;")
                        .replace(/>/gi, "&gt;")
                        .replace(/ /gi, "&nbsp;")
                        .replace(/\r\n/g, "<br />")
                        .replace(/\n\r/g, "<br />")
                        .replace(/\n/g, "<br />")
                        .replace(/\r/g, "<br />");
};

/**
    * 将字符串转换成用于title的字符串
    * 
    * @memberOf string
    * @param {Sring} str 要转换的字符串
    * @return {Number} 返回转换后的in title字符串
    */
Teein.toTitle = function (str) {
    return String(str).replace(/\\/gi, "\\")
                        .replace(/\'/gi, "\'")
                        .replace(/\"/gi, "\'");
};

/**
    * 将颜色 Hex 写法转换成 RGB 写法
    * 
    * @memberOf string
    * @return {String} 返回转换后的字符串
    */
Teein.hexToRgb = function (string, array) {
    var hex = string.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
    return (hex) ? hex.slice(1).hexToRgb(array) : null;
};

/**
    * 将颜色 RGB 写法转换成 Hex 写法
    * 
    * @memberOf string
    * @return {String} 返回转换后的字符串
    */
Teein.rgbToHex = function (string, array) {
    var rgb = string.match(/\d{1,3}/g);
    return (rgb) ? rgb.rgbToHex(array) : null;
};


/**
    * 。。。。
    * 
    * @memberOf string
    * @param {Object} obj 要转换成查询字符串的对象
    * @return {String} 返回转换后的查询字符串
    */
Teein.toQueryPair = function (key, value) {
    return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
};

/**
    * 。。。。
    * 
    * @memberOf string
    * @param {Object} obj 要转换成查询字符串的对象
    * @return {String} 返回转换后的查询字符串
    */
Teein.toQueryString = function (obj) {
    var result = [];
    for (var key in obj) {
        result.push(this.toQueryPair(key, obj[key]));
    }
    return result.join("&");
};


//根据QueryString参数名称获取值
Teein.getQueryString = function (key, url) {
    var result = (url || location.search).match(new RegExp("[\?\&]" + key + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
};

/**
    * 判断一个字符串是否是邮箱格式
    * @memberOf string
    * @param {String} emailStr
    * @return {Boolean}
    */
Teein.isEmail = function (emailStr) {
    if (emailStr.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * 判断一个字符串是否是以;间隔的多个邮箱
 */
Teein.isEmailS = function (emailStr) {
    if (Teein.isEmpty(emailStr))
        return false;
    var emails = emailStr.split(";");
    for (var i = 0; i < emails.length; i++) {
        if (!Teein.isEmail(emails[i]))
            return false;
    }
    return true;
}
/**
    * 按字节按给定长度裁剪给定字符串
    * @memberOf string
    * @param {String} string
    * @param {Number} n 
    * @return {String} 
    */
Teein.substring = function (string, n) {
    var result = string;
    while (result.byteLength() > n) {
        result = string.substring(0, (result.length - 1));
    }
    return result;
};


/**
    * 全局替换指定的字符串
    * 
    * @memberOf string
    * @return {String} 返回替换后的字符串
    */
Teein.replaceAll = function (string, reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return string.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return string.replace(reallyDo, replaceWith);
    }
};


/*
JS安全API v1.1
Created By Web Application Security Group of TSC
UpDate: 2007-12-08
*/


/**
    * html正文编码, 对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeHtmlSimple = function (s) {
    s = s.replace(/&/g, "&amp;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/"/g, "&quot;");
    s = s.replace(/'/g, "&#39;");
    return s;
};

/**
    * html正文解码, 对HtmlEncode函数的结果进行解码
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.decodeHtmlSimple = function (s) {
    s = s.replace(/&amp;/g, "&");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/&#39;/g, "'");
    return s;
};

Teein.decodeHtmlSimple2 = function (s) {
    s = s.replace(/&amp;/g, "&");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/\\\\"/g, '"');
    s = s.replace(/\\\\'/g, "'");
    return s;
};

/**
    * html属性编码：对需要出现在HTML属性里的不信任输入进行编码
    注意:
    (1)该函数不适用于属性为一个URL地址的编码.这些标记包括:a/img/frame/iframe/script/xml/embed/object...
    属性包括:href/src/lowsrc/dynsrc/background/...
    (2)该函数不适用于属性名为 style="[Un-trusted input]" 的编码
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeHtmlAttributeSimple = function (s) {
    s = s.replace(/&/g, "&amp;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/"/g, "&quot;");
    s = s.replace(/'/g, "&#39;");
    s = s.replace(/=/g, "&#61;");
    s = s.replace(/`/g, "&#96;");
    return s;
};




/**
    * 用做过滤直接放到HTML里的
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeHtml = function (s) {
    return s.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function (r) {
        return "&#" + r.charCodeAt(0) + ";";
    }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
};

/**
    * 用做过滤HTML标签里面的东东 比如这个例子里的&lt;input value="XXXX"&gt;  XXXX就是要过滤的
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeHtmlAttribute = function (s) {
    return s.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (r) {
        return "&#" + r.charCodeAt(0) + ";";
    });
};

/**
    * 用做过滤直接放到HTML里js中的
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeScript = function (s) {
    s += "";//确保为String
    return s.replace(/[\\"']/g, function (r) {
        return "\\" + r;
    }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
};



/**
    * 用做过滤直接放到<a href="javascript:XXXX">中的
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeHrefScript = function (s) {
    return this.encodeHtml(this.encodeUrl(s));
};

/**
    * 用做过滤直接放到正则表达式中的
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeRegExp = function (s) {
    return s.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function (a, b) {
        return "\\" + a;
    });
};

/**
    * 用做过滤直接URL参数里的  比如 http://show8.qq.com/abc_cgi?a=XXX  XXX就是要过滤的
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeUrl = function (s) {
    return escape(s).replace(/\+/g, "%2B");
};

/**
    对需要出现在一个URI的一部分的不信任输入进行编码 
    例如:
    <a href="http://search.msn.com/results.aspx?q1=[Un-trusted-input]& q2=[Un-trusted-input]">Click Here!</a>
    以下字符将会被编码: 
    除[a-zA-Z0-9.-_]以外的字符都会被替换成URL编码
    *
    * @memberOf string
    * @param {String} s
    * @return {String} 
    */
Teein.encodeUriComponent = function (s) {
    s = encodeURIComponent(s);
    s = s.replace(/~/g, "%7E");
    s = s.replace(/!/g, "%21");
    s = s.replace(/\*/g, "%2A");
    s = s.replace(/\(/g, "%28");
    s = s.replace(/\)/g, "%29");
    s = s.replace(/'/g, "%27");
    s = s.replace(/\?/g, "%3F");
    s = s.replace(/;/g, "%3B");
    return s;
};

/*
* Cookie 公用方法
* 
*/
var Cookie = (window['Cookie'] || {});
Cookie.domainPrefix = window.location.host;
/**
    * 设置一个cookie
    * 
    * @param {String} name cookie名称
    * @param {String} value cookie值
    * @param {String} domain 所在域名
    * @param {String} path 所在路径
    * @param {Number} hour 存活时间，单位:小时
    * @return {Boolean} 是否成功
    */
Cookie.set = function (name, value, domain, path, hour) {
    if (hour) {
        var today = new Date();
        var expire = new Date();
        expire.setTime(today.getTime() + 3600000 * hour);
    }
    window.document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + this.domainPrefix + ";"));
    return true;
};

Cookie.setForNoDomain = function (name, value, path, hour) {
    if (hour) {
        var today = new Date();
        var expire = new Date();
        expire.setTime(today.getTime() + 3600000 * hour);
    }
    window.document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ");
    return true;
};

/**
    * 获取指定名称的cookie值
    * 
    * @param {String} name cookie名称
    * @return {String} 获取到的cookie值
    */
Cookie.get = function (name) {
    var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
    var m = window.document.cookie.match(r);
    return (!m ? "" : m[1]);

};

/**
    * 删除指定cookie,复写为过期
    * 
    * @param {String} name cookie名称
    * @param {String} domain 所在域
    * @param {String} path 所在路径
    */
Cookie.remove = function (name, domain, path) {
    window.document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + this.domainPrefix + ";"));
};

/**
    * 设置一个localStorage
    * @param {String} name
    * @param {String} value
    */
Cookie.setItem = function (name, value) {
    if (this.isSupports()) {
        window.localStorage.setItem(name, value);
    }
};
/**
    * 根据名字读取值
    * @param {String} name
    * @return {String}
    */
Cookie.getItem = function (name) {
    if (this.isSupports()) {
        return window.localStorage.getItem(name);
    }
    return null;
};
/**
    * 根据名字移除值
    * @param {String} name
    */
Cookie.removeItem = function (name) {
    if (this.isSupports()) {
        window.localStorage.removeItem(name);
    }
};
/**
    * 清空 localStorage
    */
Cookie.clear = function () {
    if (this.isSupports()) {
        window.localStorage.clear();
    }
};
/**
    * 判断是否支持 localStorage
    */
Cookie.isSupports = function () {
    return ('localStorage' in window) && window['localStorage'] !== null;
};


/*
* JSON 公用方法
* 注意！json字符串的格式一定要标准，key和value一定要用双引号包括，否则会出线解析异常
*/
var JSON = (window['JSON'] || {});
"use strict"; (function () {
    function f(n) {
        return n < 10 ? '0' + n : n
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    },
    rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable,
        function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key)
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null'
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null'
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' '
                }
            } else if (typeof space === 'string') {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify')
            }
            return str('', {
                '': value
            })
        }
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k,
                v,
                value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx,
                function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                },
                '') : j
            }
            throw new SyntaxError('JSON.parse')
        }
    }
}());

/*
* array 公用方法
* 注意！json字符串的格式一定要标准，key和value一定要用双引号包括，否则会出线解析异常
*/
var array = (window['Array'] || {});

/**
    * 正向查找数组元素在数组中的索引下标(取key)
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:indexOf
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Object} obj 要查找的数组的元素
    * @param {Number} fromIndex 开始的索引编号
    * 
    * @return {Number}返回正向查找的索引编号
    */
array.indexOf = Array.prototype.indexOf
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.indexOf.apply(arguments[0], args);
    }
    : function (arr, obj, fromIndex) {

        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, arr.length + fromIndex);
        }
        for (var i = fromIndex; i < arr.length; i++) {
            if (arr[i] === obj) {
                return i;
            }
        }
        return -1;
    };


/**
    * 反向查找数组元素在数组中的索引下标
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Object} obj 要查找的数组元素
    * @param {Number} fromIndex 开始的索引编号
    * 
    * @return {Number}返回反向查找的索引编号
    */
array.lastIndexOf = Array.prototype.lastIndexOf
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.lastIndexOf.apply(arguments[0], args);
    }
    : function (arr, obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = arr.length - 1;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, arr.length + fromIndex);
        }
        for (var i = fromIndex; i >= 0; i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
        return -1;
    };


/**
    * 遍历数组，把每个数组元素作为第一个参数来执行函数
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Function} fun 要执行的函数
    * @param {Object} contextObj 执行函数时的上下文对象，可以省略
    * 
    */
array.forEach = Array.prototype.forEach
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.forEach.apply(arguments[0], args);
    }
    : function (arr, fun /*, thisp*/) {
        var len = arr.length;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var thisp = arguments[2];
        for (var i = 0; i < len; i++) {
            if (i in arr) {
                fun.call(thisp, arr[i], i, arr);
            }
        }
    };

/**
    * 用一个自定义函数来过滤数组
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:filter
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Function} fun 过滤函数
    * @param {Object} contextObj 执行函数时的上下文对象，可以省略
    * 
    * @return {Array}返回筛选出的新数组
    */
array.filter = Array.prototype.filter
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.filter.apply(arguments[0], args);
    }
    : function (arr, fun) {
        var len = arr.length;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var res = [];
        var thisp = arguments[2];
        for (var i = 0; i < len; i++) {
            if (i in arr) {
                var val = arr[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, arr)) {
                    res.push(val);
                }
            }
        }
        return res;
    };


/**
    * 遍历数组，把每个数组元素作为第一个参数来执行函数，并把函数的返回结果以映射的方式存入到返回的数组中
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:map
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Function} fun 要执行的函数
    * @param {Object} contextObj 执行函数时的上下文对象，可以省略
    * 
    * @return {Array}返回映射后的新数组
    */
array.map = Array.prototype.map
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.map.apply(arguments[0], args);
    }
    : function (arr, fun /*, thisp*/) {
        var len = arr.length;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var res = new Array(len);
        var thisp = arguments[2];
        for (var i = 0; i < len; i++) {
            if (i in arr) {
                res[i] = fun.call(thisp, arr[i], i, arr);
            }
        }

        return res;
    };

/**
    * 遍历数组，把每个数组元素作为第一个参数来执行函数，如果所有的数组成员都使得函数执行结果返回 true，则最终返回 true，否则返回 false
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:every
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Function} fun 要执行的函数
    * @param {Object} contextObj 执行函数时的上下文对象，可以省略
    * 
    * @return {Boolean}
    */
array.every = Array.prototype.every
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.every.apply(arguments[0], args);
    }
    : function (arr, fun) {
        var len = arr.length;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var thisp = arguments[2];
        for (var i = 0; i < len; i++) {
            if (i in arr && !fun.call(thisp, arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    };





/**
    * 对该数组的每项和前一次调用的结果运行一个函数，收集最后的结果。
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.8_Reference:Objects:Array:reduce
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Function} fun 要执行的函数
    * @param {Object} contextObj 执行函数时的上下文对象，可以省略
    * 
    * @return {Boolean}
    */
array.reduce = Array.prototype.reduce
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.reduce.apply(arguments[0], args);
    }
    : function (arr, fun /*, initial*/) {
        var len = arr.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        // no value to return if no initial value and an empty array
        if (len == 0 && arguments.length == 2) {
            throw new TypeError();
        }
        var i = 0;
        if (arguments.length >= 3) {
            var rv = arguments[2];
        }
        else {
            do {
                if (i in arr) {
                    rv = arr[i++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++i >= len) {
                    throw new TypeError();
                }
            }
            while (true);
        }

        for (; i < len; i++) {
            if (i in arr) {
                rv = fun.call(null, rv, arr[i], i, arr);
            }
        }

        return rv;
    };

/**
    * 同上，但从右向左执行。
    * 
    * @link http://developer.mozilla.org/en/docs/Core_JavaScript_1.8_Reference:Objects:Array:reduceRight
    * @memberOf array
    * @function
    * 
    * @param {Array} arr 要执行操作的数组
    * @param {Function} fun 要执行的函数
    * @param {Object} contextObj 执行函数时的上下文对象，可以省略
    * 
    * @return {Boolean}
    */
array.reduceRight = Array.prototype.reduceRight
    ? function () {
        var args = Array.prototype.slice.call(arguments, 1);
        return Array.prototype.reduceRight.apply(arguments[0], args);
    }
    : function (arr, fun /*, initial*/) {
        var len = arr.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        // no value to return if no initial value, empty array
        if (len == 0 && arguments.length == 2) {
            throw new TypeError();
        }
        var i = len - 1;
        if (arguments.length >= 3) {
            var rv = arguments[2];
        }
        else {
            do {
                if (i in arr) {
                    rv = arr[i--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--i < 0) {
                    throw new TypeError();
                }
            }
            while (true);
        }

        for (; i >= 0; i--) {
            if (i in arr) {
                rv = fun.call(null, rv, arr[i], i, arr);
            }
        }

        return rv;
    };




/**
    * 将任意变量转换为数组的方法
    * 
    * @memberOf array
    * @param {Mixed} o 任意变量
    * @return {Array} 返回转换后的数组
    */
array.toArray = function (o) {
    var type = typeof (o);
    return (type) ? ((type != 'array' && type != 'arguments') ? [o] : o) : [];
};


/**
    * 从数组中移除一个或多个数组成员
    * 
    * @memberOf array
    * @param {Array} arr 要移除的数组成员，可以是单个成员也可以是成员的数组
    * @return {Boolean} 找到并移除, 返回 true
    */
array.remove = function (arr, members) {
    var members = this.toArray(members),
        i,
        j,
        flag = false;
    for (i = 0; i < members.length; i++) {
        for (j = 0; j < arr.length; j++) {
            if (arr[j] === members[i]) {
                arr.splice(j, 1);
                flag = true;
            }
        }
    }
    return flag;
};


/**
    * 替换一个数组成员
    * 
    * @memberOf array
    * @param {Object} oldValue 当前数组成员
    * @param {Object} newValue 要替换成的值
    * @return {Boolean} 如果找到旧值并成功替换则返回 true，否则返回 false
    */
array.replace = function (arr, oldValue, newValue) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === oldValue) {
            arr[i] = newValue;
            return true;
        }
    }
    return false;
};

/**
    * 冒泡排序,默认从小到大排序
    * @memberOf array
    * @param {Array} arr 需要排序的数组
    * @param {Function} compareFunc 比较方法, 传入两个参数 a,b, 若返回 大于0 则表示 a > b, 小于 0 则 a < b
    *  可选, 默认返回 a - b的结果
    * @return {Array} 排序后的数组
    * @example
    * 
    * bubbleSort([3,5,6,2], function(a, b){
    *  return a - b;
    * });
    * 
    */
array.bubbleSort = function (arr, compareFunc) {
    compareFunc = compareFunc || function (num1, num2) {
        return num1 - num2;
    };
    //数组长度
    var n = arr.length;
    //交换顺序的临时变量
    var temp;//
    //交换标志
    var exchange;
    //最多做n-1趟排序
    for (var time = 0; time < n - 1; time++) {
        exchange = false;
        for (var i = n - 1; i > time; i--) {
            if (compareFunc(arr[i], arr[i - 1]) < 0) {
                //if (arr[i] < arr[i - 1]) {
                exchange = true;
                temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;
            }
        }
        //若本趟排序未发生交换，提前终止算法
        if (!exchange) {
            break;
        }
    }
    return arr;
};

/**
    * 二叉搜索
    * @memberOf array
    * @param {Array} arr 源数组
    * @param {Object} item 查找的目标
    * @param {Function} compareFunc 比较方法, 传入两个参数 a,b, 若返回 大于0 则表示 a > b, 小于 0 则 a < b
    * @return {Number} item 所处的 index
    * 
    */
array.binarySearch = function (arr, item, compareFunc) {
    var start = 0;
    var end = arr.length;
    var current = Math.floor(arr.length / 2);
    while (end != current) {
        if (compareFunc(item, arr[current]) > 0) {
            start = current + 1;
        }
        else {
            end = current;
        };

        current = Math.floor((start + end) / 2);
    };
    return current;
};

/**
    * 判断arr是否包含元素o
    * @memberOf array
    * @name contains
    * @function
    * @param {Array} arr
    * @param {Obejct} o
    * @return {Boolean}
    */
array.contains = function (arr, o) {
    return (arr.indexOf(o) > -1);
    //return (indexOf(arr, o) > -1);
};

/**
    * 唯一化一个数组
    * @memberOf array
    * @param {Array} arr
    * @return {Array} 由不重复元素构成的数组
    */
array.uniquelize = function (arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!this.contains(result, arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
};

/**
    * 求两个集合的交集
    * a ∩ b
    * @memberOf array
    * @param {Array} a
    * @param {Array} b
    * @return {Array} a ∩ b
    */
array.intersect = function (a, b) {
    var result = [];
    for (var i = 0, len = a.length; i < len; i++) {
        if (this.contains(b, a[i])) {
            result.push(a[i]);
        }
    }
    return result;
};

/**
    * 求两个集合的差集
    * a - b
    * @memberOf array
    * @param {Array} a
    * @param {Array} b
    * @return {Array} a - b
    */
array.minus = function (a, b) {
    var result = [];
    for (var i = 0, len = a.length; i < len; i++) {
        if (!this.contains(b, a[i])) {
            result.push(a[i]);
        }
    }
    return result;
};

/**
    * 求两个集合的并集
    * a U b
    * @memberOf array
    * @param {Array} a
    * @param {Array} b
    * @return {Array} a U b
    */
array.union = function (a, b) {
    return this.uniquelize(a.concat(b));
};

array.clear = Array.prototype.clear = function () {
    this.length = 0;
}
array.insertAt = Array.prototype.insertAt = function (index, obj) {
    this.splice(index, 0, obj);
}
array.removeAt = Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
}
array.remove = Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);
    if (index >= 0) {
        this.removeAt(index);
    }
}

Teein.KoClone = function (source) {
    var result = {};
    for (var key in source) {
        result[key] = ko.observable(source[key]());
    }
    return result;
}

/*
* 打开无痕新窗口
*/
Teein.open = function (url) {
    window.location.replace(url);
}

Teein.$$ = function (id) {
    return document.getElementById(id);
}

Teein.$$$ = function (name) {
    return document.getElementsByName(name);
}

Teein.LoadScript = function (src, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = script.onreadystatechange = function () {
        if (callback) {
            callback();
        }
    }
    document.head.appendChild(script);
};


//获取完整URL
function getAjaxUrl(pagename) {
    var basehref = $("#baseelement").attr("basehref");
    var controller = $("#baseelement").attr("controller");
    var action = $("#baseelement").attr("action");

    if (basehref && controller && action) {
        return $.trim(basehref).RTrim("/") + "/" + controller + "/" + pagename;
    }
    else {
        var index = document.URL.split("?")[0].lastIndexOf("/");
        return document.URL.substring(0, index) + "/" + pagename;
    }
}

function update(appid) {
    if (appid == currentAppId) {
        return;
    }
    switchToAppId = appid;
    $.getJSON(getAjaxUrl("../Account/SwitchApp"), { appid: switchToAppId }, function (result) {
        if (result.IsSuccess) {
            if (currentAppId != switchToAppId) {
                window.location.reload();
            }
        } else {
            Teein.Alert(result.Text);
        }
        $('.close-pop-reveal-modal').click();
    });
}

function updateScrollbar(selector) {
    $(".mid").niceScroll().resize();
    $(".sidenav").niceScroll()
    var selectorScroll = $(selector).find(".slippage-content");
    $(selectorScroll).niceScroll().resize();
    $("div[id^=ascrail]").css({ "opacity": "0", "visibility": "hidden" });
}

///Socialed系统的环境变量
var Environment;
(function (Environment) {

    //当前用户
    (function (CurrentUser) {
        CurrentUser.userID = "";
        CurrentUser.userDisplayName = "";
        CurrentUser.accountID = "";
        CurrentUser.accountMobile = "";
        CurrentUser.accountEmail = "";
    })(Environment.CurrentUser || (Environment.CurrentUser = {}))
    var CurrentUser = Environment.CurrentUser;

    //当前app
    (function (CurrentApp) {
        CurrentApp.AppID = "";
        CurrentApp.AppSID = "";
        CurrentApp.AppDisplayName = "";
    })(Environment.CurrentApp || (Environment.CurrentApp = {}))
    var CurrentApp = Environment.CurrentApp;

    //当前用户所有的app
    (function (MyAppList) {
        MyAppList.push({
            AppID: "",
            AppSID: "",
            AppDisplayName: "",
            IsCurrent: false
        })
    })(Environment.MyAppList || (Environment.MyAppList = []))
    var MyAppList = Environment.MyAppList;

    (function (TipType) {
        TipType.Success = 1;
        TipType.Info = 2;
        TipType.Warn = 3;
        TipType.Error = 4;
    })(Environment.TipType || (Environment.TipType = {}))
    var TipType = Environment.TipType;

    (function (Browser) {
        Browser.msie = false;
        Browser.firefox = false;
        Browser.opera = false;
        Browser.safari = false;
        Browser.chrome = false;
        Browser.netscape = false;
        Browser.appname = 'unknown';
        Browser.version = 0;
        var userAgent = window.navigator.userAgent.toLowerCase();
        if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
            Browser[RegExp.$1] = true;
            Browser.appname = RegExp.$1;
            Browser.version = RegExp.$2;
        } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) { // safari 
            Browser.safari = true;
            Browser.appname = 'safari';
            Browser.version = RegExp.$2;
        }
        return Browser;
    }(Environment.Browser || (Environment.Browser = {})))
    var Browser = Environment.Browser;

    //当前环境的初始化
    (function (Init) {
        Init = function (url) {
            $.getJSON(url, function () {

            });
        };
    })(Environment.Init || (Environment.Init = function () { }))



    //所有的apiurls
    Environment.ApiUrls = {

    };
})(Environment || (Environment = {}));


//成功 1，消息 2,警告 3，错误 4
Teein.Tip = function (content, tiptype, keeplive) {
    if (!tiptype) { tiptype = 1; }
    if (!keeplive || keeplive < 10) {
        keeplive = 3000;
    }
    $(".alert-warp").html("").show();

    switch (tiptype) {
        case 1:
            $(".alert-warp").html('<div class="alert alert-success">' + content + '</div>').animate({ "opacity": "1", "top": "15px", "display": "block" }, 300, function () {
                setTimeout(function () {
                    $(".alert-warp").animate({ "top": "0" }, 200, function () {
                        $(".alert-warp").hide().html("");
                    });
                }, keeplive);
            })
            break;
        case 2:
            $(".alert-warp").html('<div class="alert alert-info">' + content + '</div>').animate({ "opacity": "1", "top": "15px", "display": "block" }, 300, function () {
                setTimeout(function () {
                    $(".alert-warp").animate({ "top": "0" }, 200, function () {
                        $(".alert-warp").hide().html("");
                    });
                }, keeplive);
            });
            break;
        case 3:
            $(".alert-warp").html('<div class="alert alert-warning">' + content + '</div>').animate({ "opacity": "1", "top": "15px", "display": "block" }, 300, function () {
                setTimeout(function () {
                    $(".alert-warp").animate({ "top": "0" }, 200, function () {
                        $(".alert-warp").hide().html("");
                    });
                }, keeplive);
            });
            break;
        case 4:
            $(".alert-warp").html('<div class="alert alert-danger">' + content + '</div>').animate({ "opacity": "1", "top": "15px", "display": "block" }, 300, function () {
                setTimeout(function () {
                    $(".alert-warp").animate({ "top": "0" }, 200, function () {
                        $(".alert-warp").hide().html("");
                    });
                }, keeplive);
            });
            break;
    }
}
//验证是否是手机号
var isPhone = Teein.isPhone = function (phoneStr) {
    if (phoneStr.search(/^1[34587]\d{9}$/) != -1) {
        return true;
    }
    else {
        return false;
    }
};

//验证是否是邮编
var isZipCode = Teein.isZipCode = function (phoneStr) {
    if (phoneStr.search(/^\d{6}$/) != -1) {
        return true;
    }
    else {
        return false;
    }
};

/**
    * 处理页面上的所有脚本链接的加载
    * @src {String} s
    * @callback {Function} 
    */
Teein.LoadScript = function (src, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = script.onreadystatechange = function () {
        if (callback) {
            callback();
        }
    }
    document.head.appendChild(script);
};

/**
    * 处理页面上的所有链接后面增加随机参数,刷新缓存
    * @src {String} s
    * @random {String} 
    */
Teein.Append_Debug_Random = function (src, random) {
    if (!Teein.isEmpty(src)) {
        if (src.indexOf("debug_random") > -1) {
            var debug_random = Teein.getQueryString("debug_random", src);
            src = src.replace("debug_random=" + debug_random, "debug_random=" + random)
        }
        else {
            if (src.indexOf("?") > -1) {
                src += "&debug_random=" + random;
            }
            else {
                src += "?debug_random=" + random;
            }
        }
    }

    return src;
}

/**
* 设置页面的所有链接为debug模式
* @isdebug {String} s
*/
Teein.Debug = function (isdebug) {
    if (isdebug) {
        var random = Teein.random(100000, 999999);

        //找到所有的图片
        var imgs = $("img");
        for (var i = 0; i < imgs.length; i++) {
            var src = $(imgs[i]).attr("src");
            $(imgs[i]).attr("src", Teein.Append_Debug_Random(src, random));
        }

        //找到所有的script
        var scripts = $("script");
        for (var i = 0; i < scripts.length; i++) {
            var src = $(scripts[i]).attr("src");
            $(scripts[i]).attr("src", Teein.Append_Debug_Random(src, random));
        }

        //找到所有的css
        var links = $("link");
        for (var i = 0; i < links.length; i++) {
            var link = $(links[i]).attr("link");
            $(links[i]).attr("link", Teein.Append_Debug_Random(link, random));
        }
    }
}

Teein.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
Teein.base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
/**
 * base64编码
 * @param {Object} str
 */
Teein.base64encode = function (str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += Teein.base64EncodeChars.charAt(c1 >> 2);
            out += Teein.base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += Teein.base64EncodeChars.charAt(c1 >> 2);
            out += Teein.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += Teein.base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += Teein.base64EncodeChars.charAt(c1 >> 2);
        out += Teein.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += Teein.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += Teein.base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
/**
 * base64解码
 * @param {Object} str
 */
Teein.base64decode = function (str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = Teein.base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = Teein.base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = Teein.base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = Teein.base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
/**
 * utf16转utf8
 * @param {Object} str
 */
Teein.utf16to8 = function (str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        }
        else
            if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
    }
    return out;
}
/**
 * utf8转utf16
 * @param {Object} str
 */
Teein.utf8to16 = function (str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx10xx xxxx10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}

/**
 * 指定月份对应的天数
 * @param {Object} str
 */
Teein.DaysInMonth = function (year, month) {
    month = parseInt(month); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。 
    var temp = new Date(year, month, 0);
    return temp.getDate();

}

/**
 * 指定月份对应的天数
 * @param {int} len 长度
 * @param {int} radix 进制
 */
Teein.RandomString = function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || 16;

    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
/**
 * 指定月份对应的天数
 * @param {int} func 函数
 */
Teein.TryCall = function (func) {
    try {
        if (func) { func() }
    } catch (e) { }
}

/**
 * 指定月份对应的天数
 * @param {object} options 函数
 {
    DropDownList:[{
        selector:'selector_year',
        change:function(){}
    },{
        selector:'selector_month',
        change:function(){}
    },{
        selector:'selector_day',
        change:function(){}
    }]
 }
 测试用例:
         <div>
            <select id="selector_year"></select>
            <select id="selector_month"></select>
            <select id="selector_day"></select>
        </div>
        <script type="text/javascript">
            Teein.CalendarCascadeDropDownList({
                     DropDownList:[{
                         selector:'#selector_year',
                         change: function (target) {
                             console.log($(target).val());
                         }
                     },{
                         selector:'#selector_month',
                         change: function (target) {
                             console.log($(target).val());
                         }
                     },{
                         selector:'#selector_day',
                         change: function (target) {
                             console.log($(target).val());
                         }
                     }]
            })
        </script>
 */
Teein.CalendarCascadeDropDownList = function (options) {

    var self = this;

    /**
    * 设置日下拉
    * @param {object} current 函数 {year:2008,month:1}
    * 其中year和month都可以没有值
    */
    self.SetDay = function (current) {
        //绑定下拉项
        var year = 0;
        var month = 0;
        if (!current) {
            current = {};
        }

        if (current.current_year) {
            year = current.current_year;
        }
        else {
            year = $(options.DropDownList[0].selector).val();
        }
        if (current.current_month) {
            month = current.current_month;
        }
        else {
            month = $(options.DropDownList[1].selector).val();
        }

        $(current.DropDownList[2].selector).html("");
        if (!current.DropDownList[2].value || current.DropDownList[2].value == 0) {
            $(current.DropDownList[2].selector).append("<option value='0' selected='selected'>--日--</option>");
        }
        else {
            $(current.DropDownList[2].selector).append("<option value='0'>--日--</option>");
        }

        var _year = new Date().getFullYear();
        var _month = new Date().getMonth()+1;
        if (current.current_year && current.current_month && _year == current.current_year && _month == current.current_month) {
            var _maxday = new Date().getDate();
            for (var m = 1; m <= _maxday; m++) {
                var option = "";
                if ((current.DropDownList[2].value && current.DropDownList[2].value == m)
                    || (current.day && current.day == m)) {
                    option = "<option value='{0}' selected='selected'>{0}日</option>".format(m);
                }
                else {
                    option = "<option value='{0}'>{0}日</option>".format(m);
                }
                $(current.DropDownList[2].selector).append(option);
            }            
        }
        else {
            var _maxday = Teein.DaysInMonth(year, month);
            for (var m = 1; m <= _maxday; m++) {
                var option = "";
                if ((current.DropDownList[2].value && current.DropDownList[2].value == m)
                    || (current.day && current.day == m)) {
                    option = "<option value='{0}' selected='selected'>{0}日</option>".format(m);
                }
                else {
                    option = "<option value='{0}'>{0}日</option>".format(m);
                }
                $(current.DropDownList[2].selector).append(option);
            }
        }
    }

    self.InitDay = function (current,callback) {
        //绑定下拉项
        var year = 0;
        var month = 0;
        if (!current) {
            current = {};
        }

        if (current.year) {
            year = current.current_year;
        }

        if (current.month) {
            month = current.current_month;
        }

        $(options.DropDownList[0].selector).val(current.current_year);
        $(options.DropDownList[0].selector).change();
        $(options.DropDownList[1].selector).val(current.current_month);
        $(options.DropDownList[1].selector).change();
        $(options.DropDownList[2].selector).html("");
        if (!options.DropDownList[2].value || options.DropDownList[2].value == 0) {
            $(options.DropDownList[2].selector).append("<option value='0' selected='selected'>--日--</option>");
        }
        else {
            $(options.DropDownList[2].selector).append("<option value='0'>--日--</option>");
        }

        var _maxday = Teein.DaysInMonth(year, month);
        for (var m = 1; m <= _maxday; m++) {
            var option = "";
            if ((options.DropDownList[2].value && options.DropDownList[2].value == m)
                || (current.day && current.day == m)) {
                option = "<option value='{0}' selected='selected'>{0}日</option>".format(m);
            }
            else {
                option = "<option value='{0}'>{0}日</option>".format(m);
            }
            $(options.DropDownList[2].selector).append(option);
        }

        $(options.DropDownList[2].selector).change();
        if (callback) { callback(options); }
    }

    if (typeof options.DropDownList == "object" &&
        Object.prototype.toString.apply(options.DropDownList)
        //toString.apply(options.DropDownList) === '[object Array]'
        ) {
        for (var i = 0; i <= options.DropDownList.length - 1; i++) {
            var dropDownOptions = options.DropDownList[i];
            var selector = dropDownOptions.selector;
            var change = dropDownOptions.change;
            var temp = "";
            switch (i) {
                case 0:  //年
                    $(selector).html('');
                    var maxYear = new Date().getFullYear() + 2;
                    var options_0 = [];
                    if (!dropDownOptions.value || dropDownOptions.value == 0) {
                        //绑定下拉项
                        $(selector).append("<option value='0' selected='selected'>--年--</option>");
                    }
                    else {
                        $(selector).append("<option value='0'>--年--</option>");
                    }
                    var years = dropDownOptions.years;
                    if (!years) {
                        years = [];
                        for (var j = 2008; j <= maxYear; j++) {
                            years.push(j);
                        }
                    }
                    for (var j = 0; j < years.length; j++) {
                        if (dropDownOptions.value && dropDownOptions.value == years[j]) {
                            options_0.push("<option value='{0}' selected='selected'>{0}年</option>".format(years[j]));
                        }
                        else {
                            options_0.push("<option value='{0}'>{0}年</option>".format(years[j]));
                        }
                    }
                    var temp = options_0.join("");

                    $(selector).append(temp);
                    //绑定下拉事件
                    $(selector).change(function () {
                        if (change) {
                            self.SetDay({ current_year: $(this).val(), DropDownList: options.DropDownList });
                            change(this);
                        }
                    });
                    break;
                case 1://月
                    $(selector).html('');
                    //绑定下拉项
                    if (!dropDownOptions.value || dropDownOptions.value == 0) {
                        $(selector).append("<option value='0' selected='selected'>--月--</option>");
                    }
                    else {
                        $(selector).append("<option value='0'>--月--</option>");
                    }

                    if (!dropDownOptions.minMonth) { dropDownOptions.minMonth = 1;}
                    if (!dropDownOptions.maxMonth) { dropDownOptions.maxMonth = 12; }

                    for (var k = dropDownOptions.minMonth; k <= dropDownOptions.maxMonth; k++) {
                        var option = "";
                        if (dropDownOptions.value && dropDownOptions.value == k) {
                            option = "<option value='{0}' selected='selected'>{0}月</option>".format(k);
                        }
                        else {
                            option = "<option value='{0}'>{0}月</option>".format(k);
                        }
                        $(selector).append(option);
                    }

                    //绑定下拉事件
                    $(selector).change(function () {
                        if (change) {
                            self.SetDay({ current_year: $(options.DropDownList[0].selector).val(), current_month: $(this).val(), DropDownList: options.DropDownList });
                            change(this);
                        }
                    });
                    break;
                case 2://日
                    $(selector).html('');
                    self.SetDay({ DropDownList: options.DropDownList });
                    //绑定下拉事件
                    $(selector).change(function () {
                        if (change) {
                            change(this);
                        }
                    });
                    break;
            }
        }
    }

    return self;
}

/*
***************获取验证码倒计时方法****************

@htmlObject="time" 倒计时容器对象可id=time或class=time;
@second 倒计时初始秒数
@inittitle 初始验证码按钮文字
@actionTitle 倒计时进行时文字
@start 点击按钮后执行的方法
@callback 倒计时结束后执行的方法
@example
<div class="time" id="times"></div>
Teein.ValidateCount("time",60,"获取验证码","已发送",function(){alert("点击按钮后执行的方法")},function(){alert("callback")}); 
或者 Teein.ValidateCount("times",60,"获取验证码","已发送",function(){alert("点击按钮后执行的方法")},function(){alert("callback")});

*/
Teein.ValidateCount = function (htmlObject, second, inittitle, actionTitle, start, callback) {
    var timeObject;

    if (document.getElementById(htmlObject)) {
        timeObject = document.getElementById(htmlObject);
    } else if (document.querySelector("." + htmlObject)) {
        timeObject = document.querySelector("." + htmlObject);
    } else {
        alert("请输入正确对应的倒计时容器id或Class");
    };
    timeObject.innerHTML = inittitle;
    var flag = 0;
    var saveSecond = second;
    timeObject.onclick = function () {
        if (flag == 0) {
            flag = 1;
            if (start) {
                start();
            }
            var countSecond = setInterval(
			function () {
			    if (second <= 0) {
			        flag = 0;
			        clearInterval(countSecond);
			        second = saveSecond;
			        timeObject.innerHTML = inittitle;
			        if (callback) {
			            callback();
			        };

			        return false;
			    }
			    second--;
			    timeObject.innerHTML = actionTitle + second + "秒...";
			},
			1000);
        };
    };

}


Teein.InitRegion = function (options) {
    var region = options.region, parentid = options.cityid;
    var region_selector = options.region_selector;
    var procince_city_region_array = options.procince_city_region_array;
    var arrayRegion = [], regions = "<option>--区县--</option>";
    //获取指定省份下对应的城市
    procince_city_region_array.filter(function (item, index, arr) {
        if (item["Level"] == 4 && item.ParentID == parentid) {
            arrayRegion.push(item);
        }
    });

    if (arrayRegion.length == 0) {
        arrayRegion.push({
            "ProvinceCityCodeID": -999,
            "Name": "其他",
            "Level": 4,
            "ParentID": parentid
        });
    }

    //绑定区县
    for (var i = 0; i < arrayRegion.length; i++) {
        var tempregion = arrayRegion[i];
        regions += "<option value='{0}' parentid={2}>{1}</option>".format(tempregion.Name, tempregion.Name, tempregion.ProvinceCityCodeID);
    }

    $(region_selector).html(regions);

    $(region_selector).change(function () {
        if (options.callback && options.callback.region_callback) {
            options.callback.region_callback({
                text: $(this).find("option:selected").text(),
                value: $(this).find("option:selected").val()
            });
        }
    });
    if (region) {
        $(region_selector).val(region).change();
    }

}

Teein.InitCity = function (options) {
    var city = options.city, region = options.region, parentid = options.provinceid;
    var city_selector = options.city_selector, region_selector = options.region_selector;
    var procince_city_region_array = options.procince_city_region_array;

    var arrayCity = [], citys = "<option>--市--</option>";
    //获取指定省份下对应的城市
    procince_city_region_array.filter(function (item, index, arr) {
        if (item["Level"] == 3 && item.ParentID == parentid) {
            arrayCity.push(item);
        }
    });
    //绑定城市下拉
    for (var i = 0; i < arrayCity.length; i++) {
        var tempcity = arrayCity[i];
        citys += "<option value='{0}' parentid={2}>{1}</option>".format(tempcity.Name, tempcity.Name, tempcity.ProvinceCityCodeID);
    }
    $(city_selector).html(citys);

    $(city_selector).change(function () {
        var cityid = $(this).find("option:selected").attr("parentid");
        options.cityid = cityid;

        if (options.callback && options.callback.city_callback) {
            options.callback.city_callback({
                text: $(this).find("option:selected").text(),
                value: $(this).find("option:selected").val()
            });
        }

        var tmpprev = $(region_selector).prev().get(0);
        if (tmpprev && tmpprev.nodeName.toString().toLowerCase() == "span") {
            $(region_selector).prev().text("--区县--")
        }
        Teein.InitRegion(options);
    });

    //选中城市
    if (city) {
        $(city_selector).val(city).change();
    }
}

//初始化省市县
Teein.InitProvince_City_Region = function (options) {
    var procince = options.procince, city = options.city, region = options.region;
    var procince_selector = options.procince_selector, city_selector = options.city_selector, region_selector = options.region_selector;
    var procince_city_region_array = options.procince_city_region_array;

    var arrayProvince = [], procinces = "<option>--省--</option>";


    $(city_selector).html("<option>--市--</option>");
    $(region_selector).html("<option>--区县--</option>");

    procince_city_region_array.filter(function (item, index, arr) {
        if (item["Level"] == 2) {
            arrayProvince.push(item);
        }
        
    });

    //获取省份
    for (var i = 0; i < arrayProvince.length; i++) {
        var tempprocince = arrayProvince[i];
        procinces += "<option value='{0}' parentid={2}>{1}</option>".format(tempprocince.Name, tempprocince.Name, tempprocince.ProvinceCityCodeID);
    }
    $(procince_selector).html(procinces);


    //省份下拉项更改时
    $(procince_selector).change(function () {
        var provinceid = $(this).find("option:selected").attr("parentid");
        options.provinceid = provinceid;
        $(city_selector).html("<option>--市--</option>");
        $(region_selector).html("<option>--区县--</option>");
        if (options.callback && options.callback.procince_callback) {
            options.callback.procince_callback({
                text: $(this).find("option:selected").text(),
                value: $(this).find("option:selected").val(),
                
            });
        }
        var tmpprev = $(city_selector).prev().get(0);
        if (tmpprev && tmpprev.nodeName.toString().toLowerCase() == "span") {
            $(city_selector).prev().text("--市--");
            $(region_selector).prev().text("--区县--")
        }
        Teein.InitCity(options);
    });



    //选中省份
    if (procince) {
        $(procince_selector).val(procince).change();
    }

}


Teein.CalendarYear = function (length) {
    var maxYear = new Date().getFullYear();
    var minYear = maxYear - length;
    var years = [];
    for (var i = minYear; i <= maxYear; i++) {
        years.push(i);
    }
    return years;
}

/*
    var city_select_control = Teein.CustomSelect({
        select: {
            selector: "#city_select",
            change: function (result) { console.log(result) },
            datalist: [{value:"",text:"请选择"},{ value: "C1", text: "北京" }, { value: "C2", text: "上海" }],
            defaultvalue: "C1"
        },
        span: {
            selector: "#city_span",
            defaulttext: ""
        }
    });
*
html=<div>
    <span id="city_span"></span>
    <select id="city_select">

    </select>
</div>,
options = {
    select:{
        selector:"",
        change:"",
        datalist:[{value:"C1",text:"北京"},{value:"C2",text:"上海"}],
        defaultvalue:""
    },
    span:{
        selector:"",
        defaulttext:""
    }
};
*/
Teein.CustomSelect = function (options) {
    var select_selector = options.select.selector,
        span_selector = options.span.selector,
        select_change = options.select.change,
        span_defaulttext = options.span.defaulttext,
        select_datalist = options.select.datalist,
        select_defaultvalue = options.select.defaultvalue;

    var _this = this;

    //改变选项
    _this.change = function (select_control)
    {
        var spanText = $(select_control).find("option:selected").text() || $(select_control).find("option:selected").val();
        $(span_selector).text(spanText);
    }

    //绑定下拉
    _this.bind = function (dataArray, default_item) {

        var select_control = $(select_selector).get(0);

        if (select_control)
        {
            //清空下拉
            select_control.options.length = 0;

            //绑定下拉
            for (var i = 0; i < dataArray.length; i++) {
                select_control.options.add(new Option(dataArray[i].text, dataArray[i].value || dataArray[i].text));
            }

            $(select_selector).unbind("change");
            //change事件绑定
            $(select_selector).on("change", function () {
                var _this_change = this;
                _this.change(_this_change);
                if(select_change)
                {
                    select_change(_this_change);
                }
            })
        }
    };

    //设置span控件的默认值
    _this.setSpanDefault = function (default_select_item) {
        //设置
        if (span_defaulttext) {
            $(span_selector).text(span_defaulttext);
        }
        else {
            if (default_select_item && default_select_item.length > 0) {
                $(span_selector).text(span_defaulttext);
            }
        }
    }
    
    //设置初始值
    _this.init = function () {
        //下拉默认的选项
        var default_select_item = select_datalist.filter(function(item,index){
            return item.value == select_defaultvalue;
        });
        _this.bind(select_datalist, default_select_item);
        _this.setSpanDefault(default_select_item);
    };

    _this.init();

    return _this;
}