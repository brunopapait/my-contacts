import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  function changeName(e) {
    setName(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePhone(e) {
    setPhone(e.target.value);
  }

  function changeCategory(e) {
    setCategory(e.target.value);
  }

  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={changeName} />
      </FormGroup>
      <FormGroup>
        <Input placeholder="E-mail" value={email} onChange={changeEmail} />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Telefone" value={phone} onChange={changePhone} />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={changeCategory}>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
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
