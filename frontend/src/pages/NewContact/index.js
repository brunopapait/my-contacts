import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit(formData) {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId
    };

    try {
      const response = await ContactsService.createContacts(contact);
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao cadastrar o contato !');
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
