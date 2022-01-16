import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { Card, Container, Header, InputSearchContainer, ListContainer } from './styles';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome .." />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Bruno H. Papait</strong>
              <small>Facebook</small>
            </div>
            <span>brunohpapait@gmail.com</span>
            <span>(44) 99863-9827</span>
          </div>
          <div className="actions">
            <Link to="/edit/12">
              <img src={edit} alt="Editar" />
            </Link>
            <button type="button">
              <img src={trash} alt="Deletar" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Bruno H. Papait</strong>
              <small>Facebook</small>
            </div>
            <span>brunohpapait@gmail.com</span>
            <span>(44) 99863-9827</span>
          </div>
          <div className="actions">
            <Link to="/edit/12">
              <img src={edit} alt="Editar" />
            </Link>
            <button type="button">
              <img src={trash} alt="Deletar" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Bruno H. Papait</strong>
              <small>Facebook</small>
            </div>
            <span>brunohpapait@gmail.com</span>
            <span>(44) 99863-9827</span>
          </div>
          <div className="actions">
            <Link to="/edit/12">
              <img src={edit} alt="Editar" />
            </Link>
            <button type="button">
              <img src={trash} alt="Deletar" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}

fetch('http://localhost:3333/contacts')
  .then(async (response) => {
    const json = await response.json();
    console.log(json);
  })
  .catch((error) => {
    console.log(error);
  });

// SOP -> Same Origin Police -> Politica de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre
//                                          origens cruzadas
// ORIGEM: (URL) -> protocolo://dominio:porta = http://localhost:3000

//   Saída: http://localhost:3000
// Destino: http://localhost:3000

// PREFLIGHT -> Pré-voô
// OPTIONS -> http://localhost:3333/contacts
