import emptyBoxImage from '../../../../assets/images/empty-box.svg';
import { Container } from './styles';

export function EmptyList() {
  return (
    <Container>
      <img src={emptyBoxImage} alt="Empty box" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>”Novo contato”</strong>
        à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}

EmptyList.propTypes = {

};
