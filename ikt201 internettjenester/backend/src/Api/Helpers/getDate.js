const date = new Date()
const dateString =
  date.getDate() +
  '-' +
  (date.getMonth() + 1) +
  '-' +
  date.getFullYear() +
  ' ' +
  date.getHours() +
  ':' +
  date.getMinutes() +
  ':' +
  date.getSeconds()

module.exports = dateString
