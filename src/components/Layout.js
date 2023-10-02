import { useState } from 'react'
import styled from 'styled-components'
import Chatrooms from './Chatrooms'
import Chatroom from './Chatroom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const ChatroomContainer = styled.div`
  flex: 1;
`

const Layout = () => {
  const [roomId, setRoomId] = useState()

  const onChatroomClick = (roomId) => {
    setRoomId(roomId)
  }

  return (<Container>
    <div>
      <Chatrooms onClick={onChatroomClick} />
    </div>
    <ChatroomContainer>
      <Chatroom key={roomId} roomId={roomId} />
    </ChatroomContainer>
  </Container>)
}

export default Layout