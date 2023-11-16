import { ElNotification } from 'element-plus'
import parseYAML from 'js-yaml'
import DIRECTIVE_MAP from './directive'

export function scheduleNotification(title: string, message?: string) {
  platform.value === 'electron'
    ? window.Electron.notification(title, message)
    : ElNotification({ title, message })
}

export function parseYAMLString(yamlString: string) {
  const yaml = parseYAML.load(yamlString) as DirectiveType
  let status: STATUS_TYPE = 'ready'
  const execute = DIRECTIVE_MAP.find(item => item.key === yaml.key)?.execute
  if (!yaml.key || !execute)
    status = 'notFound'

  return {
    key: yaml.key,
    status,
    args: yaml.args,
    execute,
  } as DirectiveFType
}
