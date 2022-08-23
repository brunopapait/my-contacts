import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = event.detail;
      setMessage((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    }
  }, []);

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
