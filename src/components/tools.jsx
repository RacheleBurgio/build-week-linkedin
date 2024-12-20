export const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const daysSinceDate = (isoDate) => {
  const date = new Date(isoDate)
  const today = new Date()
  const differenceInTime = today - date
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24))
  return differenceInDays
}

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 1000) + 1
}
