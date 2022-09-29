import PropTypes from 'prop-types';
import Spinner from '../Spinner';

import { StyledButton } from './styles';

export default function Button({ type, disabled, isLoading, danger, onClick, children }) {
  return (
    <StyledButton
      type={type}
      danger={danger}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? <Spinner size={16} /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined
};
