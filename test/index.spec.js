import assert from "assert"
import dateRangeDiff from "../lib/index"

describe("diff date", () => {
  describe("开始时间：1号，结束时间：月底", () => {
    it("2020/01/01 - 2021/12/31", () => {
      const result = dateRangeDiff("2020/01/01", "2021/12/31")

      assert.equal(result.years, 2)
      assert.equal(result.months, 0)
      assert.equal(result.days, 0)
    })

    it("2019/12/01 - 2020/05/31", () => {
      const result = dateRangeDiff("2019/12/01", "2020/05/31")

      assert.equal(result.years, 0)
      assert.equal(result.months, 6)
      assert.equal(result.days, 0)
    })

    it("2020/01/01 - 2020/05/31", () => {
      const result = dateRangeDiff("2020/01/01", "2020/05/31")

      assert.equal(result.years, 0)
      assert.equal(result.months, 5)
      assert.equal(result.days, 0)
    })

    it("2020/01/01 - 2020/02/29", () => {
      const result = dateRangeDiff("2020/01/01", "2020/02/29")

      assert.equal(result.years, 0)
      assert.equal(result.months, 2)
      assert.equal(result.days, 0)
    })

    it("2019/01/01 - 2019/02/28", () => {
      const result = dateRangeDiff("2019/01/01", "2019/02/28")

      assert.equal(result.years, 0)
      assert.equal(result.months, 2)
      assert.equal(result.days, 0)
    })

    it("2020/01/31 - 2020/02/29", () => {
      const result = dateRangeDiff("2020/01/31", "2020/02/29")

      assert.equal(result.years, 0)
      assert.equal(result.months, 1)
      assert.equal(result.days, 1)
    })
  })

  describe("开始时间：非1号，结束时间：非月底", () => {
    it("2020/01/01 - 2020/02/28", () => {
      const result = dateRangeDiff("2020/01/01", "2020/02/28")

      assert.equal(result.years, 0)
      assert.equal(result.months, 1)
      assert.equal(result.days, 28)
    })

    it("2019/01/05 - 2020/01/04", () => {
      const result = dateRangeDiff("2019/01/05", "2020/01/04")

      assert.equal(result.years, 1)
      assert.equal(result.months, 0)
      assert.equal(result.days, 0)
    })

    it("2020/01/20 - 2020/07/19", () => {
      const result = dateRangeDiff("2020/01/20", "2020/07/19")

      assert.equal(result.years, 0)
      assert.equal(result.months, 6)
      assert.equal(result.days, 0)
    })

    it("2020/01/31 - 2020/02/28", () => {
      const result = dateRangeDiff("2020/01/31", "2020/02/28")

      assert.equal(result.years, 0)
      assert.equal(result.months, 1)
      assert.equal(result.days, 0)
    })
  })
})
