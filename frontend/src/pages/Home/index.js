import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import formatPhone from '../../utils/formatPhone';
import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListHeader
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTem] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prevState) => !prevState);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(e) {
    setSearchTem(e.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type='text'
          placeholder='Pesquise pelo nome ..'
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to='/new'>Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type='button' onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt='Arrow' />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((item) => (
        <Card key={item.id}>
          <div className='info'>
            <div className='contact-name'>
              <strong>{item.name}</strong>
              {item.category_name && <small>{item.category_name}</small>}
            </div>
            <span>{item.email}</span>
            <span>{formatPhone(item.phone)}</span>
          </div>
          <div className='actions'>
            <Link to={`/edit/${item.id}`}>
              <img src={edit} alt='Editar' />
            </Link>
            <button type='button'>
              <img src={trash} alt='Deletar' />
            </button>
          </div>
        </Card>
      ))}
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

// O código que eu tenho abaixo da promisse que eu quero usar o AWAIT,
// depende dessa promisse ser executada ? Sim .. então use await
// se a resposta for não .. use o encadeamento .then
