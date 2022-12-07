
import Loader from '../../components/Loader';
import useHome from './useHome';
import { Container } from './styles';
import InputSearch from './components/InputSearch';
import { Header } from './components/Header';
import { ErrorStatus } from './components/ErrorStatus';
import { EmptyList } from './components/EmptyList';
import { SearchNotFound } from './components/SearchNotFound';
import { ContactsList } from './components/ContactsList';
import Modal from '../../components/Modal';

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

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (
        <ErrorStatus
          onTryAgain={handleTryAgain}
        />
      )}

      {
        !hasError && (
          <>
            {(contacts.length === 0 && !isLoading) && (
              <EmptyList />
            )}

            {
              (contacts.length > 0 && filteredContacts.length === 0) && (
                <SearchNotFound
                  value={searchTerm}
                />
              )
            }
            <ContactsList
              filteredContacts={filteredContacts}
              orderBy={orderBy}
              onToggleOrderBy={handleToggleOrderBy}
              isDeleteModalVisible={isDeleteModalVisible}
              onDeleteContact={handleDeleteContact}
            />

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
