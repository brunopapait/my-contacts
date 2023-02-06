import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import xCheckIcon from '../../../assets/images/icons/check-circle.svg';


function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => onRemoveMessage(message.id), message.duration || 7000);

    return () => clearTimeout(timeoutId);
  }, [onRemoveMessage, message.id, message.duration]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role='button'
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={xCheckIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

export default memo(ToastMessage);

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
    duration: PropTypes.number
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired
};
