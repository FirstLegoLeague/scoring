export default (callback, dt = 200) => {
  let timeout = null
  return data => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => callback(data), dt)
  }
}
