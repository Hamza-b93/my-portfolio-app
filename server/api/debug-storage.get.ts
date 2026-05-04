export default defineEventHandler(async () => {
  const storage = useStorage('assets:resume')
  const keys = await storage.getKeys()
  return { keys, cwd: process.cwd() }
})
