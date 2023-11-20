# directives
Suggestion: You need to add the `notification` directive at the end of the directive list, otherwise the result of the directive cannot be displayed. Or you don't need to see the results please ignore this suggestion
## date-time
get current date and time
> parameter format
```yaml
key: date-time
args:
  format: YYYY-MM-DD HH:mm:ss
```
> format:
* type: `string`
* default: YYYY-MM-DD HH:mm:ss

placeholder:

| 标识   | 示例               | 描述                    |
| ----- | ----------------  | ----------------------- |
| YY    | 18                | 年，两位数                |
| YYYY  | 2018              | 年，四位数                |
| M     | 1-12              | 月，从1开始               |
| MM    | 01-12             | 月，两位数                |
| MMM   | Jan-Dec           | 月，英文缩写              |
| MMMM  | January-December  | 月，英文全称              |
| D     | 1-31              | 日                      |
| DD    | 01-31             | 日，两位数               |
| d     | 0-6               | 一周中的一天，星期天是 0    |
| dd    | Su-Sa             | 最简写的星期几            |
| ddd   | Sun-Sat           | 简写的星期几              |
| dddd  | Sunday-Saturday   | 星期几，英文全称           |
| H     | 0-23              | 小时                    |
| HH    | 00-23             | 小时，两位数              |
| h     | 1-12              | 小时, 12 小时制          |
| hh    | 01-12             | 小时, 12 小时制, 两位数   |
| m     | 0-59              | 分钟                    |
| mm    | 00-59             | 分钟，两位数              |
| s     | 0-59              | 秒                      |
| ss    | 00-59             | 秒，两位数               |
| S     | 0-9               | 毫秒（十），一位数         |
| SS    | 00-99             | 毫秒（百），两位数         |
| SSS   | 000-999           | 毫秒，三位数              |
| Z     | -05:00            | UTC 的偏移量，±HH:mm     |
| ZZ    | -0500             | UTC 的偏移量，±HHmm      |
| A     | AM / PM           | 上/下午，大写            |
| a     | am / pm           | 上/下午，小写            |

## notification
send a notification
```yaml
key: notification
args:
  title: ''
  message: ''
```
### argument introduce
> `title`

* type: string
* default: the schedule title

> `message`
* type: string
* default: the schedule description
If this directive follows another directive, this message is the result of the previous directive
