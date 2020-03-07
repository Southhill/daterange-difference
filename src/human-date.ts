/**
 * 判断当前日期是否为闰年
 * @param {Date} dt 日期
 */
function isLeapYear(y: number): boolean {
  return y % 400 === 0 || (y % 400 !== 0 && y % 4 === 0)
}
/**
 * 是否为闰年的2月29号
 * @param {Date} dt 日期
 */
function isLeapYMD(dt: Date): boolean {
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()

  return isLeapYear(y) && m === 2 && d === 29
}
/**
 * 是否为闰年的2月28号
 * @param {Date} dt 日期
 */
function isLeapTheDayBefore(dt: Date): boolean {
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()

  return isLeapYear(y) && m === 2 && d === 28
}
/**
 * 是否结束日期是闰年的2月29号，并且开始日期是同一年的2月28号
 * @param {Date} startDate 开始的日期
 * @param {Date} endDate 结束的日期
 */
function isLeapOneDay(startDate: Date, endDate: Date): boolean {
  return (
    startDate.getFullYear() === endDate.getFullYear() &&
    isLeapTheDayBefore(startDate) &&
    isLeapYMD(endDate)
  )
}
/**
 * 紧挨闰年的平年的2月28号
 * @param {Date} dt 日期
 */
function isNonLeapYear228(dt: Date): boolean {
  let y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()

  return (isLeapYear(y + 1) || isLeapYear(y - 1)) && m === 2 && d === 28
}
/**
 * 紧挨闰年的前一年的2月28，用于年份的加法
 * @param {Date} dt 日期
 */
function isForwardYear228(dt: Date): boolean {
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()

  return isLeapYear(y + 1) && m === 2 && d === 28
}
/**
 * 紧挨闰年的后一年的2月28，用于年份的减法
 * @param {Date} dt 日期
 */
function isBackwardYear228(dt: Date): boolean {
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()

  return isLeapYear(y - 1) && m === 2 && d === 28
}
/**
 * 是传入日期的最后一天
 * @param {Date} dt 日期
 */
function isLastDayForMonth(dt: Date): boolean {
  const lastDay = totalDayForMonth(dt)

  return dt.getDate() === lastDay
}
/**
 * 获取当前日期的月份的全天数
 * @param {Date} dt 日期
 */
function totalDayForMonth(dt: Date): number {
  const y = dt.getFullYear()
  const m = dt.getMonth()
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (isLeapYear(y) && m + 1 === 2) {
    return 29
  } else {
    return days[m]
  }
}

export default class HumanDate {
  dt: Date

  constructor(dt: string | Date) {
    if (typeof dt === "string") {
      try {
        this.dt = new Date(dt)
      } catch (err) {
        throw err
      }
    } else if (dt instanceof Date) {
      this.dt = new Date(dt.getTime())
    } else {
      throw new Error("wrong parameter for Date")
    }
  }

  get year(): number {
    return this.dt.getFullYear()
  }
  set year(num: number) {
    this.dt.setFullYear(num)
  }
  get month(): number {
    return this.dt.getMonth()
  }
  set month(num: number) {
    this.dt.setMonth(num)
  }
  get day(): number {
    return this.dt.getDate()
  }
  set day(num: number) {
    this.dt.setDate(num)
  }
  get timestamp(): number {
    return this.dt.getTime()
  }
  get humanMonth(): number {
    return this.month + 1
  }

  addOneYear(): this {
    if (isLeapYMD(this.dt)) {
      this.year += 1
      this.day -= 1
    } else if (isForwardYear228(this.dt)) {
      this.year += 1
      this.day += 1
    } else {
      this.year += 1
    }

    return this
  }

  addOneMonth(): this {
    if (isLastDayForMonth(this.dt)) {
      this.month += 2
      this.day = 0
    } else {
      this.month += 1
    }

    return this
  }
  addOneDay(): this {
    this.day += 1

    return this
  }

  minusOneYear(): this {
    if (isLeapYMD(this.dt)) {
      this.year -= 1
      this.day -= 1
    } else if (isBackwardYear228(this.dt)) {
      this.year -= 1
      this.day += 1
    } else {
      this.year -= 1
    }

    return this
  }

  minusOneMonth(): this {
    if (isLastDayForMonth(this.dt)) {
      this.day = 0
    } else {
      this.month -= 1
    }

    return this
  }

  minusOneDay(): this {
    this.day -= 1

    return this
  }
}
