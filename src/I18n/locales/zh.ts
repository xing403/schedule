import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zh from '~/I18n/locales/zh.json'
import { flexibleValue } from '~/I18n/extension'

export default {
  ...zh,
  flexible: ({ named }: any) => flexibleValue(named('flexible')),
  ...zhCn,
}
