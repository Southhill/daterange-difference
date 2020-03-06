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
  opts?: DiffOpts
): DiffDayResult
export {}
