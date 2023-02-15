import PropTypes from 'prop-types';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';
import ReactPortal from '../ReactPortal';
import useAnimationUnmount from '../../hooks/useAnimationUnmount';

export default function Modal({
  visible,
  isLoading = false,
  danger = false,
  title,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  children }) {
  const { animatedElementRef, shouldRender } = useAnimationUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId='modal-root'>
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
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
