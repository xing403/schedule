import enUs from 'element-plus/es/locale/lang/en'
import { flexibleValue } from '../extension'
import en from '~/I18n/locales/en.json'

export default {
  ...en,
  flexible: ({ named }: any) => flexibleValue(named('flexible')),
  ...enUs,
}
