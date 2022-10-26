class ContactMapper {
  toPersistence(domainContatc) {
    return {
      name: domainContatc.name,
      email: domainContatc.email,
      phone: domainContatc.phone,
      category_id: domainContatc.categoryId
    }
  }

  toDomain(persistenceContact) {
    return {};
  }
}

export default new ContactMapper();
