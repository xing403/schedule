import dateTime from './date-time'
import notification from './notification'
import TTS from './tts'
import mqtt from './mqtt'

export const Directives: DirectiveFType[] = [
  dateTime,
  notification,
  mqtt,
  TTS,
]

export default Directives
