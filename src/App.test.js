import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('There are default five chatrooms', () => {
  render(<App />);
  const chatrooms = screen.getByTestId('chatrooms')
  expect(chatrooms).toBeInTheDocument();

  expect(chatrooms.children.length).toBe(5)
});


test('when clicking the chatroom, it will show the messages', () => {
  render(<App />);

  const chatrooms = screen.getByTestId('chatrooms')

  expect(screen.queryByTestId('message-list')).not.toBeInTheDocument()

  fireEvent.click(chatrooms.children[0])

  const messageList = screen.queryByTestId('message-list')

  expect(messageList).toBeInTheDocument()
})

test('can input the message', () => {
  render(<App />);

  const chatrooms = screen.getByTestId('chatrooms')
  fireEvent.click(chatrooms.children[0])

  const inputElement = screen.getByTestId('message-input');

  fireEvent.input(inputElement, { target: { value: 'Hello, World!' } })

  expect(inputElement.value).toBe('Hello, World!');
})
