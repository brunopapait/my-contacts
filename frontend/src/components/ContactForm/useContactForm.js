import { useEffect, useImperativeHandle, useState } from 'react';
import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import CategoriesService from '../../services/CategoriesService';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isValidaEmail';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValue: (contact) => {
      console.log(contact);
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    }
  }
  ), []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList)
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmiting(true);
    await onSubmit({ name, email, phone, categoryId });

    setIsSubmiting(false);
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
    setCategoryId(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  return {
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
  };
}
