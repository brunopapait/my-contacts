import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import formatPhone from '../../utils/formatPhone';
import { Card, Container, Header, InputSearchContainer, ListContainer } from './styles';


export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
      });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome .." />

      </InputSearchContainer>

      <Header>
        <strong>{contacts.length} {contacts.length === 1 ? 'contato' : 'contatos'}</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
        {
          contacts.map(item => (
            <Card key={item.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{item.name}</strong>
                  {item.category_name && <small>{item.category_name}</small>}
                </div>
                <span>{item.email}</span>
                <span>{formatPhone(item.phone)}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${item.id}`}>
                  <img src={edit} alt="Editar" />
                </Link>
                <button type="button">
                  <img src={trash} alt="Deletar" />
                </button>
              </div>
            </Card>
          ))
        }


      </ListContainer>
    </Container>
  );
}

// SOP -> Same Origin Police -> Politica de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre
//                                          origens cruzadas
// ORIGEM: (URL) -> protocolo://dominio:porta = http://localhost:3000

//   Saída: http://localhost:3000
// Destino: http://localhost:3000

// PREFLIGHT -> Pré-voô
// OPTIONS -> http://localhost:3333/contacts
