/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import emptyBox from '../../assets/images/empty-box.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import formatPhone from '../../utils/formatPhone';
import {
  Card,
  Container, EmptyListContainer, ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader
} from './styles';


export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      // const contactsList = []; await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading((prevState) => !prevState);
    }
  }, [orderBy]);


  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(e) {
    setSearchTem(e.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {
        (!hasError && contacts.length > 0) && (
          <InputSearchContainer>
            <input
              type='text'
              placeholder='Pesquise pelo nome ..'
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </InputSearchContainer>
        )
      }

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (contacts.length > 0
              ? 'space-between'
              : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to='/new'>Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}
      {
        !hasError && (
          <>
            {(contacts.length === 0 && !isLoading) && (
              <EmptyListContainer>
                <img src={emptyBox} alt="Empty box" />
                <p>
                  Você ainda não tem nenhum contato cadastrado!
                  Clique no botão <strong>”Novo contato”</strong>
                  à cima para cadastrar o seu primeiro!
                </p>
              </EmptyListContainer>
            )}
            {
              filteredContacts.length > 0 && (
                <ListHeader orderBy={orderBy}>
                  <button type='button' onClick={handleToggleOrderBy}>
                    <span>Nome</span>
                    <img src={arrow} alt='Arrow' />
                  </button>
                </ListHeader>
              )
            }

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
          </>
        )
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

// O código que eu tenho abaixo da promisse que eu quero usar o AWAIT,
// depende dessa promisse ser executada ? Sim .. então use await
// se a resposta for não .. use o encadeamento .then
