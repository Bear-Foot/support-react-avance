export const sleep = (ms = 500) => new Promise((res) => {
  setTimeout(res, ms)
})
