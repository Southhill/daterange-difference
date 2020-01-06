const dateRangeDiff = require("../lib/index.js").default;

const str1 = "2020-01-01";
const str2 = "2021-02-28";
const result = dateRangeDiff(str1, str2);

console.log(`${str2} and ${str1} date difference result: \n`, result);
