import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useChatroomMessage } from './providers/AppProvider'
import { scrollToEnd } from '../utils'

const List = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-flow: column;
  padding: 24px 12px;
  border-bottom: 1px solid black;
  flex: 1;
  margin: 0;
  overflow: scroll;
`

const Message = styled.li`
  padding: 12px 16px ;
  cursor: pointer;
  display: flex;
  flex-flow: column;
`
const Date = styled.p``

const Text = styled.p`
  margin-top: 12px;
  width: fit-content;
`

const MessageList = ({ roomId, onMessageClick }) => {
  const ref = useRef()
  const messages = useChatroomMessage(roomId)

  useEffect(() => {
    if (!ref.current) return

    scrollToEnd(ref.current)
  }, [messages])

  return <List ref={ref}>{
    messages?.map(({ id, text, last_updated }) => {
      return <Message key={id}>
        <Date>{last_updated}</Date>
        <Text onClick={() => onMessageClick({ id, text, last_updated })}>{text}</Text>
      </Message>
    })
  }</List>
}

export default MessageList