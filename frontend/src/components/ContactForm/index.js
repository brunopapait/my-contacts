import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup';

import isEmailValid from '../../utils/isValidaEmail';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('instagram');
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name, email, phone, category
    });
  }

  function changeName(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setErrors((prevState) => [...prevState, { field: 'name', message: 'Nome é obrigatório.' }]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'name'));
    }
  }

  function changeEmail(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) return;

      setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail inválido.' }]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'));
    }
  }

  function changePhone(e) {
    setPhone(e.target.value);
  }

  function changeCategory(e) {
    setCategory(e.target.value);
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={changeName}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={changeEmail}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={changePhone}
        />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={changeCategory}>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};
