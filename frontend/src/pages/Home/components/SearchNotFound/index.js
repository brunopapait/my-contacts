import PropTypes from 'prop-types';
import magnifierQuestionImage from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

export function SearchNotFound({ value }) {
  return (
    <Container>
      <img src={magnifierQuestionImage} alt="Magnifier question" />
      <span>
        Nenhum resultado foi encontrado para <strong>{value}</strong>
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  value: PropTypes.string.isRequired
};
