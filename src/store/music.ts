const useMusicStore = defineStore('music', () => {
  const start = ref(false)
  const toggleStart = useToggle(start)
  const url = ref('')

  return {
    toggleStart,
    start,
    url,
  }
})
export default useMusicStore
