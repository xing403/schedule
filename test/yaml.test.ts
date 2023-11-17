import YAML from 'js-yaml'
import { expect, it } from 'vitest'

it('yaml string parse', () => {
  expect(YAML.load(`
      key: 'date-time'
      args:
        format: 'YYYY-MM-DD HH:mm:ss'
  `)).toMatchSnapshot()
})
