const Directives: DirectiveFType[] = []

export async function getGlobDirectives() {
  const directives = import.meta.glob('./*.ts')
  for (const directive in directives) {
    await directives[directive]().then((res: any) => {
      Directives.push(res.default)
    })
  }
}
export default Directives
