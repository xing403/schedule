export const WeekMap: Array<string> = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const MonthMap: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const DayOfMonthMap = Array.from({ length: 31 }, (_, i) => {
  return {
    label: `第 ${i + 1} 天`,
    Abbreviated: `第 ${i + 1} 天`,
    CN: `第 ${i + 1} 天`,
    En: `Day ${i + 1}`,
    value: i + 1,
  }
})

export const HourMap: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export const MinuteMap: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]

export const monthQuickSelection: Array<{
  key: string
  label: string
  value: number[]
}> = [{
  key: 'All',
  label: '全部',
  value: Array.from({ length: 12 }, (_, i) => i + 1),
}, {
  key: 'EveryTwoMonthsFront',
  label: '每两个月(前)',
  value: Array.from({ length: 6 }, (_, i) => i * 2 + 1),
}, {
  key: 'EveryTwoMonthsRear',
  label: '每两个月(后)',
  value: Array.from({ length: 6 }, (_, i) => i * 2 + 2),
}, {
  key: 'EveryThreeMonths',
  label: '每三个月',
  value: Array.from({ length: 4 }, (_, i) => i * 3 + 1),
}, {
  key: 'EveryFourMonths',
  label: '每四个月',
  value: Array.from({ length: 3 }, (_, i) => i * 4 + 1),
}, {
  key: 'EverySixMonths',
  label: '每六个月',
  value: Array.from({ length: 2 }, (_, i) => i * 6 + 1),
}]

export const dayOfMonthQuickSelection: Array<{
  key: string
  label: string
  value: number[]
}> = [{
  key: 'All',
  label: '全部',
  value: Array.from({ length: 31 }, (_, i) => i + 1),
}, {
  key: 'EveryTwoDaysFront',
  label: '每两天(前)',
  value: Array.from({ length: 16 }, (_, i) => i * 2 + 1),
}, {
  key: 'EveryTwoDaysRear',
  label: '每两天(后)',
  value: Array.from({ length: 15 }, (_, i) => i * 2 + 2),
}, {
  key: 'EveryThreeDays',
  label: '每三天',
  value: Array.from({ length: 10 }, (_, i) => i * 3 + 1),
}, {
  key: 'EveryFiveDays',
  label: '每五天',
  value: Array.from({ length: 6 }, (_, i) => i * 5 + 1),
}, {
  key: 'EveryTenDays',
  label: '每十天',
  value: Array.from({ length: 3 }, (_, i) => i * 10 + 1),
}]

export const dayOfWeekQuickSelection: Array<{
  key: string
  label: string
  value: number[]
}> = [{
  key: 'All',
  label: '全部',
  value: [0, 1, 2, 3, 4, 5, 6],
}, {
  key: 'Monday2Friday',
  label: '周一至周五',
  value: [1, 2, 3, 4, 5],
}, {
  key: 'SaturdayAndSunday',
  label: '周六和周日',
  value: [0, 6],
}]

export const hourQuickSelection: Array<{
  key: string
  label: string
  value: number[]
}> = [{
  key: 'All',
  label: '全部',
  value: Array.from({ length: 24 }, (_, i) => i),
}, {
  key: 'EveryTwoHoursFront',
  label: '每两小时(前)',
  value: Array.from({ length: 12 }, (_, i) => i * 2),
}, {
  key: 'EveryTwoHoursRear',
  label: '每两小时(后)',
  value: Array.from({ length: 12 }, (_, i) => i * 2 + 1),
}, {
  key: 'EveryThreeHours',
  label: '每三小时',
  value: Array.from({ length: 8 }, (_, i) => i * 3),
}, {
  key: 'EveryFourHours',
  label: '每四小时',
  value: Array.from({ length: 6 }, (_, i) => i * 4),
}, {
  key: 'EverySixHours',
  label: '每六小时',
  value: Array.from({ length: 4 }, (_, i) => i * 6),
}, {
  key: 'EveryEightHours',
  label: '每八小时',
  value: Array.from({ length: 3 }, (_, i) => i * 8),
}, {
  key: 'EveryTwelveHours',
  label: '每十二小时',
  value: Array.from({ length: 2 }, (_, i) => i * 12),
}]

export const minuteQuickSelection: Array<{
  key: string
  label: string
  value: number[]
}> = [{
  key: 'All',
  label: '全部',
  value: Array.from({ length: 60 }, (_, i) => i),
}, {
  key: 'EveryTwoMinutesFront',
  label: '每两分钟(前)',
  value: Array.from({ length: 30 }, (_, i) => i * 2),
}, {
  key: 'EveryTwoMinutesRear',
  label: '每两分钟(后)',
  value: Array.from({ length: 30 }, (_, i) => i * 2 + 1),
}, {
  key: 'EveryFiveMinutes',
  label: '每五分钟',
  value: Array.from({ length: 12 }, (_, i) => i * 5),
}, { // 间隔十分钟
  key: 'EveryTenMinutes',
  label: '每十分钟',
  value: Array.from({ length: 6 }, (_, i) => i * 10),
}, { // 间隔15分钟
  key: 'EveryFifteenMinutes',
  label: '每十五分钟',
  value: Array.from({ length: 4 }, (_, i) => i * 15),
}, {
  key: 'EveryTwentyMinutes',
  label: '每二十分钟',
  value: Array.from({ length: 3 }, (_, i) => i * 20),
}, {
  key: 'EveryThirtyMinutes',
  label: '每三十分钟',
  value: Array.from({ length: 2 }, (_, i) => i * 30),
}]
