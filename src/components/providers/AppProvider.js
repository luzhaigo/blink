import { createContext, useState, useMemo, useContext, useCallback } from 'react'
import { createMessagePayload } from '../../utils'

const Context = createContext()

const transform = (data) => {
  data.sort((a, b) => a.last_updated > b.last_updated ? -1 : 1)
  return data.reduce(({ chatrooms = [], chatroomMessageMap = {} }, { messages, ...rest }) => {
    messages.sort((a, b) => a.last_updated < b.last_updated ? -1 : 1)
    chatrooms.push(rest)
    chatroomMessageMap[rest.id] = messages

    return { chatrooms, chatroomMessageMap }
  }, {})
}

export const AppProvider = ({ data, children }) => {
  const [appState, setAppState] = useState(() => transform(data))

  const value = useMemo(() => {
    const createMessage = (roomId, message) => {
      const messagePayload = createMessagePayload(message)
      let { chatroomMessageMap, chatrooms } = appState

      // update chatrooms list status
      const idx = chatrooms.findIndex(c => c.id === roomId)
      const chatroom = chatrooms[idx]
      chatroom.last_updated = messagePayload.last_updated
      chatrooms.splice(idx, 1)
      chatrooms = [chatroom, ...chatrooms]

      // update chatroom status
      const messages = chatroomMessageMap[roomId]

      setAppState({ chatrooms, chatroomMessageMap: { ...chatroomMessageMap, [roomId]: [...messages, messagePayload] } })
    }

    const updateMessage = (roomId, messageId, message) => {
      let { chatroomMessageMap, } = appState

      const messages = chatroomMessageMap[roomId].map(m => m.id === messageId ? { ...m, text: message } : m)

      setAppState((value) => ({ ...value, chatroomMessageMap: { ...chatroomMessageMap, [roomId]: messages } }))
    }
    return { ...appState, createMessage, updateMessage }
  }, [appState])

  return <Context.Provider value={value}>
    {children}
  </Context.Provider>
}

const useAppContext = () => {
  return useContext(Context)
}

export const useChatrooms = () => {
  return useAppContext().chatrooms
}

export const useChatroomMessage = (id) => {
  return useAppContext().chatroomMessageMap[id]
}

export const useCreateMessage = (id) => {
  const { createMessage } = useAppContext()

  return useCallback((text) => {
    return createMessage(id, text)
  }, [createMessage, id])
}

export const useUpdateMessage = (id) => {
  const { updateMessage } = useAppContext()

  return useCallback((messageId, text) => {
    return updateMessage(id, messageId, text)
  }, [updateMessage, id])
} 