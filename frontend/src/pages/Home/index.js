/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import emptyBox from '../../assets/images/empty-box.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import sad from '../../assets/images/sad.svg';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import formatPhone from '../../utils/formatPhone';
import Modal from '../../components/Modal';
import useHome from './useHome';
import {
  Card,
  Container, EmptyListContainer, ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer
} from './styles';


export default function Home() {
  const {
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    hasError,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"`}
        confirmLabel='Deletar'
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
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
              (contacts.length > 0 && filteredContacts.length === 0) && (
                <SearchNotFoundContainer>
                  <img src={magnifierQuestion} alt="Magnifier question" />
                  <span>
                    Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>
                  </span>
                </SearchNotFoundContainer>
              )
            }

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
                    {item.category.name && <small>{item.category.name}</small>}
                  </div>
                  <span>{item.email}</span>
                  <span>{formatPhone(item.phone)}</span>
                </div>
                <div className='actions'>
                  <Link to={`/edit/${item.id}`}>
                    <img src={edit} alt='Editar' />
                  </Link>
                  <button type='button' onClick={() => handleDeleteContact(item)}>
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
