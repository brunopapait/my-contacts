import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo } from 'react';
import editImage from '../../../../assets/images/icons/edit.svg';
import arrowImage from '../../../../assets/images/icons/arrow.svg';
import trashImage from '../../../../assets/images/icons/trash.svg';
import formatPhone from '../../../../utils/formatPhone';

import { Card, ListHeader } from './styles';

function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact
}) {
  return (
    <>
      {
        filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type='button' onClick={onToggleOrderBy}>
              <span>Nome</span>
              <img src={arrowImage} alt='Arrow' />
            </button>
          </ListHeader>
        )
      }

      {filteredContacts.map((item) => (
        <Card key={item.id}>
          <div className='info'>
            <div className='contact-name'>
              <strong>{item.name}</strong>
              {item.category.name && <small>{item.category.name}</small>}
            </div>
            <span>{item.email}</span>
            <span>{formatPhone(item.phone)}</span>
          </div>
          <div className='actions'>
            <Link to={`/edit/${item.id}`}>
              <img src={editImage} alt='Editar' />
            </Link>
            <button type='button' onClick={() => onDeleteContact(item)}>
              <img src={trashImage} alt='Deletar' />
            </button>
          </div>
        </Card>
      ))}
    </>
  )
}

export default memo(ContactsList);

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};
