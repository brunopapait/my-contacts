import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    isSubmiting,
    name,
    changeName,
    email,
    changeEmail,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    changeCategory,
    categories,
    isFormValid
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          disabled={isSubmiting}
          placeholder="Nome*"
          value={name}
          onChange={changeName}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          disabled={isSubmiting}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={changeEmail}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          disabled={isSubmiting}
          placeholder="Telefone"
          maxLength="15"
          value={phone}
          onChange={handlePhoneChange}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={changeCategory}
          disabled={isLoadingCategories || isSubmiting}
        >
          <option value=''>Sem categoria</option>
          {
            categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmiting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
