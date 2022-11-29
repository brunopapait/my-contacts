import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import useEditContact from './useEditContact';

export default function EditContent() {
  const { isLoading, contactName, contactFormRef, handleSubmit } = useEditContact();

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando contato ..' : `Editar ${contactName}`} />
      <ContactForm ref={contactFormRef} buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  );
}
