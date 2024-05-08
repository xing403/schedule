import SvgIcon from '~/components/SvgIcon/index.vue'

export function createIconComponents(name: string, size: number | string = '1.2em') {
  return h(SvgIcon, { name, size })
}
