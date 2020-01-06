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
  } while (startHumanDate.timestamp <= endDate.getTime());

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