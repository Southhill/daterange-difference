import HumanDate from "./human-date"
interface DiffDayResult {
  years: number
  months: number
  days: number
  weeks: number
  totalDay: number
  totalMonth: number
  totalYear: number
}

interface DiffOpts {
  includeLastDay?: boolean
}

export default function dateRangeDiff(
  startDateStr: string,
  endDateStr: string,
  opts: DiffOpts = {}
): DiffDayResult {
  const reg: RegExp = /^\d{4}([\/-])\d{2}\1\d{2}$/
  const { includeLastDay = true } = opts

  if (!reg.test(startDateStr) || !reg.test(endDateStr)) {
    throw new TypeError(
      `passed parameter format is wrong, must be the format: '2019-12-01' or '2019/12/01'`
    )
  }

  // 矫正参数位置，保证第一个参数表示的日期小于第二个日期表示的日期
  if (Date.parse(startDateStr) > Date.parse(endDateStr)) {
    const temp = endDateStr
    endDateStr = startDateStr
    startDateStr = temp
  }

  const result: DiffDayResult = {
    years: 0,
    months: 0,
    days: 0,
    weeks: 0,
    totalDay: 0,
    totalMonth: 0,
    totalYear: 0
  }

  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  if (includeLastDay) {
    // 因为选择的结束日期按照人类的思维应该是包含该天的，所以将日期向后移动一位
    endDate.setDate(endDate.getDate() + 1)
  }

  const startHumanDate = new HumanDate(startDateStr)

  // 计算年
  do {
    startHumanDate.addOneYear()
    result.years += 1
  } while (startHumanDate.timestamp <= endDate.getTime())

  // 最终跳出while循环时，startDate的日期被多加1，这里做修正处理
  startHumanDate.minusOneYear()
  result.years -= 1

  // 计算月
  do {
    startHumanDate.addOneMonth()

    result.months += 1
  } while (startHumanDate.timestamp <= endDate.getTime())

  // 修正 startDate 时间
  startHumanDate.minusOneMonth()
  result.months -= 1

  // 计算日
  do {
    startHumanDate.addOneDay()
    result.days += 1
  } while (startHumanDate.timestamp <= endDate.getTime())
  result.days -= 1

  // 计算最终结果
  result.totalDay = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 86400000
  )
  result.totalMonth = result.years * 12 + result.months
  result.totalYear = result.years
  result.weeks = Math.floor(result.totalDay / 7)

  return result
}
