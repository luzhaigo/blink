import { useState, useCallback } from 'react'
import styled from 'styled-components'
import MessageList from './MessageList'
import MessageInputPanel from './MessageInputPanel'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`

const Chatroom = ({ roomId }) => {
  const [editingMessage, setEditingMessage] = useState()

  const onClearEditingMessage = useCallback(() => {
    setEditingMessage()
  }, [])

  return roomId ? <Container>
    <MessageList roomId={roomId} onMessageClick={setEditingMessage} />
    <MessageInputPanel roomId={roomId} editingMessage={editingMessage} onClearEditingMessage={onClearEditingMessage} />
  </Container> : null
}

export default Chatroom