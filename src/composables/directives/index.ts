const Directives: DirectiveFType[] = []

export async function getGlobDirectives() {
  const directives = import.meta.glob('./*.ts')
  for (const directive in directives) {
    await directives[directive]().then((res: any) => {
      if (!Directives.find((item: any) => item.key === res.default.key)) {
        if (res.default.support.includes(platform.value))
          Directives.push(res.default)
      }
    })
  }
}
export default Directives
