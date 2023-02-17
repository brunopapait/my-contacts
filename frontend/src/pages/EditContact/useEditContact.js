import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValue(contactData);

          setIsLoading(false);
          setContactName(contactData.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/');
          toast({ type: 'danger', text: 'Contato não encontrado !' });
        });
      }
    }
    loadContact();

    return () => {
      controller.abort();
    }
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContacts(id, contact);

      setContactName(contactData.name);
      toast({ type: 'success', text: 'Contato editar com sucesso !', duration: 3000 });
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao editar o contato !' });
    }
  }

  return { isLoading, contactName, contactFormRef, handleSubmit };
}
