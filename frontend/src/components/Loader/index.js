import PropTypes from 'prop-types';
import useAnimationUnmount from '../../hooks/useAnimationUnmount';
import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  const { animatedElementRef, shouldRender } = useAnimationUnmount(isLoading);
  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId='loader-root'>
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
