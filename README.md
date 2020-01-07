# daterange difference

## descripation
daterange difference calculate

## usage

```javascript
// 使用了babel转义`import`语法后：[use babel transform `import` synax]
import dateDiff from 'daterange-difference'
// 在node环境中使用：[use in node env]
const dateDiff = require('daterange-difference')

const result = dateDiff('2020-01-01', '2021-02-28')

// output:
// {
//    years: 1,
//    months: 2,
//    days: 0,
//    weeks: 60,
//    totalDay: 425,
//    totalMonth: 14,
//    totalYear: 1
// }
```
`dateDiff` method defaultly is include lastDay, but has third parameter is Object 'opts', setting `includeLastDay` is `false`, to result is not include lastDay.
