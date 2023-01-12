import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import Button from '../Button';

import { Overlay, Container, Footer } from './styles';
import ReactPortal from '../ReactPortal';

export default function Modal({
  visible,
  isLoading,
  danger,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  children }) {
  const [shouldRender, setShouldRender] = useState(visible);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false)
    }

    const overlayRefElement = overlayRef.current;
    if (!visible && overlayRefElement) {
      overlayRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId='modal-root'>
      <Overlay isLeaving={!visible} ref={overlayRef}>
        <Container isLeaving={!visible} danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              isLoading={isLoading}
              type="button"
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

Modal.defaultProps = {
  isLoading: false,
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar'
};
