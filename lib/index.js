"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 判断当前日期是否为闰年
 * @param {Date} dt 日期
 */
function isLeapYear(y) {
  return y % 400 === 0 || y % 400 !== 0 && y % 4 === 0;
}
/**
 * 是否为闰年的2月29号
 * @param {Date} dt 日期
 */


function isLeapYMD(dt) {
  var y = dt.getFullYear();
  var m = dt.getMonth() + 1;
  var d = dt.getDate(); // endDateStr 是闰年的2月29号

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
  return startDate.getFullYear() === endDate.getFullYear() && isLeapTheDayBefore(startDate) && isLeapYMD(endDate);
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
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapYear(y)) {
    return 29;
  } else {
    return days[dt.getMonth()];
  }
}

var HumanDate =
/*#__PURE__*/
function () {
  function HumanDate(dt) {
    _classCallCheck(this, HumanDate);

    if (typeof dt === 'string') {
      try {
        this.dt = new Date(dt);
      } catch (err) {
        throw err;
      }
    } else if (dt instanceof Date) {
      this.dt = new Date(dt.getTime());
    } else {
      throw new Error('wrong parameter for Date');
    }
  }

  _createClass(HumanDate, [{
    key: "addOneYear",
    value: function addOneYear() {
      if (isLeapYMD(this.dt)) {
        this.year += 1;
        this.day -= 1;
      } else if (isForwardYear228(this.dt)) {
        this.year += 1;
        this.day += 1;
      } else {
        this.year += 1;
      }

      return this;
    }
  }, {
    key: "addOneMonth",
    value: function addOneMonth() {
      if (isLastDayForMonth(this.dt)) {
        this.month += 2;
        this.day = 0;
      } else {
        this.month += 1;
      }

      return this;
    }
  }, {
    key: "addOneDay",
    value: function addOneDay() {
      this.day += 1;
      return this;
    }
  }, {
    key: "minusOneYear",
    value: function minusOneYear() {
      if (isLeapYMD(this.dt)) {
        this.year -= 1;
        this.day -= 1;
      } else if (isBackwardYear228(this.dt)) {
        this.year -= 1;
        this.day += 1;
      } else {
        this.year -= 1;
      }

      return this;
    }
  }, {
    key: "minusOneMonth",
    value: function minusOneMonth() {
      if (isLastDayForMonth(this.dt)) {
        this.day = 0;
      } else {
        this.month += 1;
      }

      return this;
    }
  }, {
    key: "minusOneDay",
    value: function minusOneDay() {
      this.day -= 1;
    }
  }, {
    key: "year",
    get: function get() {
      return this.dt.getFullYear();
    },
    set: function set(num) {
      this.dt.setFullYear(num);
    }
  }, {
    key: "month",
    get: function get() {
      return this.dt.getMonth();
    },
    set: function set(num) {
      this.dt.setMonth(num);
    }
  }, {
    key: "day",
    get: function get() {
      return this.dt.getDate();
    },
    set: function set(num) {
      this.dt.setDate(num);
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.dt.getTime();
    }
  }, {
    key: "humanMonth",
    get: function get() {
      return this.month + 1;
    }
  }]);

  return HumanDate;
}();

exports.default = HumanDate;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateRangeDiff;

var _humanDate = _interopRequireDefault(require("./human-date.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dateRangeDiff(startDateStr, endDateStr) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var reg = /^\d{4}([\/-])\d{2}\1\d{2}$/;
  var _opts$includeLastDay = opts.includeLastDay,
      includeLastDay = _opts$includeLastDay === void 0 ? true : _opts$includeLastDay;

  if (!reg.test(startDateStr) || !reg.test(endDateStr)) {
    throw new TypeError("passed parameter format is wrong, must be the format: '2019-12-01' or '2019/12/01'");
  } // 矫正参数位置，保证第一个参数表示的日期小于第二个日期表示的日期


  if (Date.parse(startDateStr) > Date.parse(endDateStr)) {
    var temp = endDateStr;
    endDateStr = startDateStr;
    startDateStr = temp;
  }

  var years = 0,
      months = 0,
      days = 0,
      weeks = 0,
      totalDay = 0,
      totalMonth = 0,
      totalYear = 0;
  var startDate = new Date(startDateStr);
  var endDate = new Date(endDateStr);

  if (includeLastDay) {
    // 因为选择的结束日期按照人类的思维应该是包含该天的，所以将日期向后移动一位
    endDate.setDate(endDate.getDate() + 1);
  }

  var startHumanDate = new _humanDate.default(startDateStr); // 计算年

  do {
    startHumanDate.addOneYear();
    years += 1;
  } while (startHumanDate.timestamp <= endDate.getTime()); // 最终跳出while循环时，startDate的日期被多加1，这里做修正处理


  startHumanDate.minusOneYear();
  years -= 1; // 计算月

  do {
    startHumanDate.addOneMonth();
    months += 1;
  } while (startHumanDate.timestamp <= endDate.getTime()); // 修正 startDate 时间


  startHumanDate.minusOneMonth();
  months -= 1; // 计算日

  do {
    startHumanDate.addOneDay();
    days += 1;
  } while (startHumanDate.timestamp < endDate.getTime());

  days -= 1; // 计算最终结果

  totalDay = Math.floor((endDate - startDate) / 86400000);
  totalMonth = years * 12 + months;
  totalYear = years;
  weeks = Math.floor(totalDay / 7);
  return {
    years: years,
    months: months,
    days: days,
    weeks: weeks,
    totalDay: totalDay,
    totalMonth: totalMonth,
    totalYear: totalYear
  };
}
