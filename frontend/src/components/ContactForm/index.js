import { useState } from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup';

import isEmailValid from '../../utils/isValidaEmail';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('instagram');
  const {
    setError, removeError, getErrorMessageByFieldName, errors
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log({
    //   name, email, phone, category
    // });
  }

  function changeName(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function changeEmail(e) {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function changeCategory(e) {
    setCategory(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome*"
          value={name}
          onChange={changeName}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={changeEmail}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          maxLength="15"
          value={phone}
          onChange={handlePhoneChange}
        />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={changeCategory}>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};
