import HttpClient from './utils/HttpClient';
import ContactMapper from './mappers/ContactMapper';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
    this.baseURI = '/contacts';
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`${this.baseURI}/?orderBy=${orderBy}`);
    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`${this.baseURI}/${id}`);
    return ContactMapper.toDomain(contact);
  }

  createContacts(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post(`${this.baseURI}`, { body });
  }

  updateContacts(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`${this.baseURI}/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`${this.baseURI}/${id}`);
  }
}

export default new ContactsService();
