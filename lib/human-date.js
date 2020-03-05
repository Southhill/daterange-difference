"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断当前日期是否为闰年
 * @param {Date} dt 日期
 */
function isLeapYear(y) {
    return y % 400 === 0 || (y % 400 !== 0 && y % 4 === 0);
}
/**
 * 是否为闰年的2月29号
 * @param {Date} dt 日期
 */
function isLeapYMD(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    return isLeapYear(y) && m === 2 && d === 29;
}
/**
 * 是否为闰年的2月28号
 * @param {Date} dt 日期
 */
function isLeapTheDayBefore(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    return isLeapYear(y) && m === 2 && d === 28;
}
/**
 * 是否结束日期是闰年的2月29号，并且开始日期是同一年的2月28号
 * @param {Date} startDate 开始的日期
 * @param {Date} endDate 结束的日期
 */
function isLeapOneDay(startDate, endDate) {
    return (startDate.getFullYear() === endDate.getFullYear() &&
        isLeapTheDayBefore(startDate) &&
        isLeapYMD(endDate));
}
/**
 * 紧挨闰年的平年的2月28号
 * @param {Date} dt 日期
 */
function isNonLeapYear228(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    return (isLeapYear(y + 1) || isLeapYear(y - 1)) && m === 2 && d === 28;
}
/**
 * 紧挨闰年的前一年的2月28，用于年份的加法
 * @param {Date} dt 日期
 */
function isForwardYear228(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    return isLeapYear(y + 1) && m === 2 && d === 28;
}
/**
 * 紧挨闰年的后一年的2月28，用于年份的减法
 * @param {Date} dt 日期
 */
function isBackwardYear228(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    return isLeapYear(y - 1) && m === 2 && d === 28;
}
/**
 * 是传入日期的最后一天
 * @param {Date} dt 日期
 */
function isLastDayForMonth(dt) {
    var lastDay = totalDayForMonth(dt);
    return dt.getDate() === lastDay;
}
/**
 * 获取当前日期的月份的全天数
 * @param {Date} dt 日期
 */
function totalDayForMonth(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth();
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(y) && m + 1 === 2) {
        return 29;
    }
    else {
        return days[m];
    }
}
var HumanDate = /** @class */ (function () {
    function HumanDate(dt) {
        if (typeof dt === "string") {
            try {
                this.dt = new Date(dt);
            }
            catch (err) {
                throw err;
            }
        }
        else if (dt instanceof Date) {
            this.dt = new Date(dt.getTime());
        }
        else {
            throw new Error("wrong parameter for Date");
        }
    }
    Object.defineProperty(HumanDate.prototype, "year", {
        get: function () {
            return this.dt.getFullYear();
        },
        set: function (num) {
            this.dt.setFullYear(num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HumanDate.prototype, "month", {
        get: function () {
            return this.dt.getMonth();
        },
        set: function (num) {
            this.dt.setMonth(num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HumanDate.prototype, "day", {
        get: function () {
            return this.dt.getDate();
        },
        set: function (num) {
            this.dt.setDate(num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HumanDate.prototype, "timestamp", {
        get: function () {
            return this.dt.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HumanDate.prototype, "humanMonth", {
        get: function () {
            return this.month + 1;
        },
        enumerable: true,
        configurable: true
    });
    HumanDate.prototype.addOneYear = function () {
        if (isLeapYMD(this.dt)) {
            this.year += 1;
            this.day -= 1;
        }
        else if (isForwardYear228(this.dt)) {
            this.year += 1;
            this.day += 1;
        }
        else {
            this.year += 1;
        }
        return this;
    };
    HumanDate.prototype.addOneMonth = function () {
        if (isLastDayForMonth(this.dt)) {
            this.month += 2;
            this.day = 0;
        }
        else {
            this.month += 1;
        }
        return this;
    };
    HumanDate.prototype.addOneDay = function () {
        this.day += 1;
        return this;
    };
    HumanDate.prototype.minusOneYear = function () {
        if (isLeapYMD(this.dt)) {
            this.year -= 1;
            this.day -= 1;
        }
        else if (isBackwardYear228(this.dt)) {
            this.year -= 1;
            this.day += 1;
        }
        else {
            this.year -= 1;
        }
        return this;
    };
    HumanDate.prototype.minusOneMonth = function () {
        if (isLastDayForMonth(this.dt)) {
            this.day = 0;
        }
        else {
            this.month -= 1;
        }
        return this;
    };
    HumanDate.prototype.minusOneDay = function () {
        this.day -= 1;
        return this;
    };
    return HumanDate;
}());
exports.default = HumanDate;
//# sourceMappingURL=human-date.js.map