import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);
        setContactName(contactData.name);
        contactFormRef.current.setFieldsValue(contactData);

        setIsLoading(false);
      } catch {
        history.push('/');
        toast({ type: 'danger', text: 'Contato não encontrado !' });
      }
    }
    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId
    };

    try {
      const contactData = await ContactsService.updateContacts(id, contact);

      setContactName(contactData.name);
      toast({ type: 'success', text: 'Contato editar com sucesso !', duration: 3000 });
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao editar o contato !' });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando contato ..' : `Editar ${contactName}`} />
      <ContactForm ref={contactFormRef} buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  );
}
