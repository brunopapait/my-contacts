import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import formatPhone from '../../utils/formatPhone';
import { Card, Container, Header, InputSearchContainer, ListHeader } from './styles';


export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');

  useEffect(() => {
    console.log(orderBy);
    fetch(`http://localhost:3333/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy(prevState => prevState === 'asc' ? 'desc' : 'asc');
  }

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome .." />

      </InputSearchContainer>

      <Header>
        <strong>{contacts.length} {contacts.length === 1 ? 'contato' : 'contatos'}</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
      </ListHeader>
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
