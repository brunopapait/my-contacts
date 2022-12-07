import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import sadImage from '../../../../assets/images/sad.svg';

import { Container } from './styles';

export function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sadImage} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired
};
