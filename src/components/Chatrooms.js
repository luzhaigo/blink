import styled from 'styled-components'
import { useChatrooms } from './providers/AppProvider'

const List = styled.ul`
  list-style: none;
  width: 220px;
  display: flex;
  flex-flow: column;
  padding: 0;
  border-right: 1px solid black;
  height: 100%;
  margin: 0;
`

const Item = styled.li`
  padding: 12px 16px ;
  border-bottom: 1px solid #3c3c3c;
  cursor: pointer;
  display: flex;
  flex-flow: column;
`

const LastUpdated = styled.p`
  margin-top: 12px;
`

const Chatrooms = ({ onClick }) => {
  const chatrooms = useChatrooms()

  return (<List >
    {chatrooms.map(({ id, name, last_updated }) => {
      return <Item key={id} onClick={() => onClick(id)}>
        {name}
        <LastUpdated>{last_updated}
        </LastUpdated></Item>
    })}
  </List>)
}

export default Chatrooms