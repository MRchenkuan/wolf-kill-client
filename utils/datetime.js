/**
 * 本地与服务器时间差
 */
export let timeOffset = 0;


/**
 * 去除两侧空格
 */
export function trim(str) {

	if (isNullOrWhiteSpace(str)) {
		return "";
	}
	if (typeof str != "string") {
		return str;
	}
	return str.replace(/(^\s*)|(\s*$)/g, "");
}


// 是否为空字符串或空对象
export function isNullOrWhiteSpace(str) {
	if (str == undefined || str == null) {
		return true;
	} else if (typeof str == "string" && str.replace(/ /g, "").replace(/　/g, "") == "") {
		return true;
	}
	return false;
}

/**
 * 时间字符串转时间戳
 * @param {*} time
 */
export function strToTs(time) {
    return Date.parse(time.replace('-', '/').replace('-', '/'))
}

/**
 * 时间字符串转日期
 * @param {} time
 */
export function tmToDate(time) {
    let date = time.split(" ")[0].split("-");
    return `${date[1]}月${date[2]}日`;
}

/**
 * 设置本地与服务器时间差
 * @param {*} delta
 */
export function setTimeOffset(delta){
    timeOffset = delta;
}

/**
 * 判断时间是否在时间范围内
 * @author yizhongxiang
 */
export function isTimeInBizHours(time, range){

    // 目标时间
    let formatDate = new Date(parseInt(time));
    const hours = formatDate.getHours();
    const min = formatDate.getMinutes();

    // 时间范围(默认："00:00-00:00")
    range = (range || "00:00-00:00").split('-');
    if (range[0] == range[1]) {
        return true;
    }
    range = range.map((item) => {
        let time = item.split(':');
        return [parseInt(time[0]), parseInt(time[1])]
    });
    let letfTime = range[0];

    // 是否跨天
    let acrossDay = false;
    let acrossTime = [];
    const format24 = ([hours, min]) => {
        let h = hours;
        let m = min;
        if (letfTime[0] > hours || (letfTime[0] === hours && letfTime[1] > min)) {
            acrossDay = true;
            h = 23;
            m = 59;
            acrossTime = [hours, min];
        }
        return [h, m]
    }

    let rightTime = format24(range[1]);

    // 判断
    if (hours < letfTime[0] || (min < letfTime[1] && hours === letfTime[0])) {
        if (acrossDay && !(hours > acrossTime[0] || (hours === acrossTime[0] && min > acrossTime[1]))) {
            return true;
        }
        return false;
    } else if (hours > rightTime[0] || (min > rightTime[1] && hours === rightTime[0])) {
        return false;
    } else {
        return true;
    }

}


/**
 * 获取当前时间对目标时间的称呼
 * @param {*} time
 * @param {*} target
 */
export function timeName(standard, target) {
    standard = parseInt(standard);
    target = parseInt(target);
    if (standard > target) {
        return 'ILLIGLE';
    }

    standard = new Date(standard);
    target = new Date(target);

    let leftTime = {};
    let rightTime = {};

    // leftTime.year = standard.getFullYear();
    // leftTime.month = standard.getMonth() + 1;
    leftTime.day = standard.getDate();

    // rightTime.year = target.getFullYear();
    // rightTime.month = target.getMonth() + 1;
    rightTime.day = target.getDate();

    const formatTime = (num) => {
        return num > 9 ? num : `0${num}`
    }

    if (leftTime.day < rightTime.day) {
        return target.getMinutes()
          ? `${rightTime.day}日${formatTime(target.getHours())}点${formatTime(target.getMinutes())}分`
          : `${rightTime.day}日${formatTime(target.getHours())}点`;
    } else {
        return target.getMinutes()
          ? `${formatTime(target.getHours())}点${formatTime(target.getMinutes())}分`
          : `${formatTime(target.getHours())}点`
    }
}

/**
 * 格式化时间范围的称呼
 * @param { Date } start 开始时间，时间戳
 * @param { Date } end 结束时间，时间戳
 */
export function timeRange( start, end ) {
	start = new Date(parseInt(start));
	end = new Date(parseInt(end));

	const getFormatDate = (date) => {
		let mon = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
		let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
		return `${mon}月${day}日`
	}

	if (start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
		return getFormatDate(start);
	} else {
		return `${getFormatDate(start)}-${getFormatDate(end)}`;
	}
}

/**
 * 日期格式转换为正常格式
 * @param { (String | Number | Date) } objDate 要转化的日期(可为能转换成日期格式的字符串、数字)
 * @param { string } format 格式(例：yyyy年MM月dd日 HH:mm:ss)
 */
export function formaterDate(objDate, format) {
        function formatDate(obj, format) {
            format = format || "yyyy-MM-dd HH:mm:ss";
            /// <summary>日期格式化</summary>
            /// <param type="Date" name="format">格式，如“yyyy年MM月dd日”</param>
            var o = {
                "M+": obj.getMonth() + 1, //month
                "d+": obj.getDate(), //day
                "h+": obj.getHours(), //hour
                "H+": obj.getHours(), //hour
                "m+": obj.getMinutes(), //minute
                "s+": obj.getSeconds(), //second
                "q+": Math.floor((obj.getMonth() + 3) / 3), //quarter
                "S": obj.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        };

        try {
            var date = strToDate(objDate);
            if (date != null && date.getDate().toString().toLocaleLowerCase() != "nan") {
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var milliseconds = date.getMilliseconds();
                format = format || "yyyy-MM-dd";
                return formatDate(date, format);
            } else {
                return "";
            }
        } catch (ex) {
            console.error(ex);
        }
}

/**
 * 字符串转时间格式
 * @param { (String | Number | Date) } objDate 日期
 */
export function strToDate(objDate) {
    try {
        var date = null;
        switch (typeof objDate) {
            case "object":
                date = objDate;
                break;
            case "number":
                date = new Date(objDate);
                break;
            case "string":
                objDate = objDate
                    .replace("/Date(", "")
                    .replace(")/", "")
                    .replace(/-/g, "/")
                    .replace(/T/g, " ")
                    .replace(/年|月|日/g, "/")
                    .replace(/点|时|分|秒/g, ":");
                var re = /^[1-9]+[0-9]*]*$/;
                if (re.test(objDate)) {
                    date = new Date(parseInt(objDate));
                } else {
                    var getSysInfo = wx.getSystemInfoSync();
                    var isSafari = getSysInfo && getSysInfo.system ? getSysInfo.system.toLowerCase().indexOf("ios") : "";
                    if (isSafari && objDate.indexOf(".") > 0) {
                        date = new Date(objDate.substr(0, objDate.indexOf(".")));
                        var milliseconds = objDate.substr(objDate.indexOf(".") + 1);
                        if (trim(milliseconds).length > 0) {
                            date.setMilliseconds(parseInt(milliseconds));
                        }
                    } else {
                        date = new Date(objDate);
                    }
                }
                break;
            default:
                break;
        }
        return date;
    } catch (ex) {
        return null;
    }
}

/**
 * 获取服务器当前时间
 */
export function now(){
    return Date.now() + timeOffset;
}