import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessage((prevState) => [...prevState, { id: Math.random(), type, text, duration }]);
    }

    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessage((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return { messages, handleRemoveMessage };
}
