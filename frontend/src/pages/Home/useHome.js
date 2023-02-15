import { useCallback, useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTem] = useState('');
  const defedereadSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(defedereadSearchTerm.toLowerCase())
  )), [contacts, defedereadSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy, signal);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);


  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);

    return () => {
      controller.abort();
    }
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(e) {
    setSearchTem(e.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback(contact => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts(prevState => prevState.filter(contact => contact.id !== contactBeingDeleted.id));
      handleCloseDeleteModal();

      toast({ type: 'success', text: 'Contato deletado com sucesso!' });
    } catch (error) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao deletar o contato!' });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
}
