export const WeekMap: Array<{
  label: string
  Abbreviated: string
  CN: string
  En: string
  value: number
}> = [{
  label: '星期一',
  Abbreviated: 'Mon',
  CN: '星期一',
  En: 'Monday',
  value: 1,
}, {
  label: '星期二',
  Abbreviated: 'Tue',
  CN: '星期二',
  En: 'Tuesday',
  value: 2,
}, {
  label: '星期三',
  Abbreviated: 'Wed',
  CN: '星期三',
  En: 'Wednesday',
  value: 3,
}, {
  label: '星期四',
  Abbreviated: 'Thu',
  CN: '星期四',
  En: 'Thursday',
  value: 4,
}, {
  label: '星期五',
  Abbreviated: 'Fri',
  CN: '星期五',
  En: 'Friday',
  value: 5,
}, {
  label: '星期六',
  Abbreviated: 'Sat',
  CN: '星期六',
  En: 'Saturday',
  value: 6,
}, {
  label: '星期日',
  Abbreviated: 'Sun',
  CN: '星期日',
  En: 'Sunday',
  value: 0,
}]

export const MonthMap: Array<{
  label: string
  Abbreviated: string
  CN: string
  En: string
  value: number
}> = [{
  label: '一月',
  Abbreviated: 'Jan',
  CN: '一月',
  En: 'January',
  value: 1,
}, {
  label: '二月',
  Abbreviated: 'Feb',
  CN: '二月',
  En: 'February',
  value: 2,
}, {
  label: '三月',
  Abbreviated: 'Mar',
  CN: '三月',
  En: 'March',
  value: 3,
}, {
  label: '四月',
  Abbreviated: 'Apr',
  CN: '四月',
  En: 'April',
  value: 4,
}, {
  label: '五月',
  Abbreviated: 'May',
  CN: '五月',
  En: 'May',
  value: 5,
}, {
  label: '六月',
  Abbreviated: 'Jun',
  CN: '六月',
  En: 'June',
  value: 6,
}, {
  label: '七月',
  Abbreviated: 'Jul',
  CN: '七月',
  En: 'July',
  value: 7,
}, {
  label: '八月',
  Abbreviated: 'Aug',
  CN: '八月',
  En: 'August',
  value: 8,
}, {
  label: '九月',
  Abbreviated: 'Sep',
  CN: '九月',
  En: 'September',
  value: 9,
}, {
  label: '十月',
  Abbreviated: 'Oct',
  CN: '十月',
  En: 'October',
  value: 10,
}, {
  label: '十一月',
  Abbreviated: 'Nov',
  CN: '十一月',
  En: 'November',
  value: 11,
}, {
  label: '十二月',
  Abbreviated: 'Dec',
  CN: '十二月',
  En: 'December',
  value: 12,
}]
export const DayOfMonthMap = Array.from({ length: 31 }, (_, i) => {
  return {
    label: `第 ${i + 1} 天`,
    Abbreviated: `第 ${i + 1} 天`,
    CN: `第 ${i + 1} 天`,
    En: `Day ${i + 1}`,
    value: i + 1,
  }
})

export const HourMap = Array.from({ length: 24 }, (_, i) => {
  return {
    label: i,
    Abbreviated: i,
    CN: i,
    En: i,
    value: i,
  }
})

export const MinuteMap = Array.from({ length: 60 }, (_, i) => {
  return {
    label: i,
    Abbreviated: i,
    CN: i,
    En: i,
    value: i,
  }
})

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
