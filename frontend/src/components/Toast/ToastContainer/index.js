import { useEffect } from 'react';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const {
    handleRemoveItem,
    setItems,
    renderList
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setItems((prevState) => [...prevState, { id: Math.random(), type, text, duration }]);
    }

    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setItems]);

  return (
    <Container>
      {renderList((item, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={item.id}
          message={item}
          isLeaving={isLeaving}
          onRemoveMessage={handleRemoveItem}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
