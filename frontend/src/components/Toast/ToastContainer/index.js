import { useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages] = useState([
    { id: Math.random(), type: 'default', text: 'Default toast' },
    { id: Math.random(), type: 'success', text: 'Success toast' },
    { id: Math.random(), type: 'danger', text: 'Error toast' }
  ]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          text={message.text}
          type={message.type}
        />
      ))}
    </Container>
  );
}
