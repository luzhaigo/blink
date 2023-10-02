import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export const scrollToEnd = (ele) => {
  ele.scrollTop = ele.scrollHeight
}

export const createMessagePayload = (text) => {
  return {
    id: uuidv4(),
    text,
    last_updated: dayjs().format('YYYY-MM-DDTHH:mm:ss')
  }
}

export const formatDateTime = (dateTime) => {
  return dayjs(dateTime).format('dddd D MMMM YYYY HH:mm:ss')
}