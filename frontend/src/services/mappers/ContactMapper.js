class ContactMapper {
  toPersistence(domainContatc) {
    return {
      id: domainContatc.id,
      name: domainContatc.name,
      email: domainContatc.email,
      phone: domainContatc.phone,
      category_id: domainContatc.categoryId
    }
  }

  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name
      }
    };
  }
}

export default new ContactMapper();
