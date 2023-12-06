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

export const dayOfWeek: Array<{
  label: string
  value: number[]
}> = [{
  label: '每天',
  value: [0, 1, 2, 3, 4, 5, 6],
}, {
  label: '周一至周五',
  value: [1, 2, 3, 4, 5],
}, {
  label: '周六和周日',
  value: [0, 6],
}]

export const CRON = ref<{
  [key: string]: number[]
}>({
  hour: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ],
  minute: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    57, 58, 59,
  ],
  dayOfWeek: [
    0, 1, 2, 3, 4, 5, 6,
  ],
  dayOfMonth: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
  ],
  month: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ],
  second: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    57, 58, 59,
  ],
})
