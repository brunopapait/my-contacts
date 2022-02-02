const ContactsRepository = require('../repository/ContactsRepository');
const CategoriesRepository = require('../repository/CategoriesRepository');

class ContactController {

  /**
 * Listar todos os registros.
 */
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    return response.json(contacts);
  }
  /**
   * Obter apenas UM registro
   */
  async show(request, response) {

    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  /**
 * Criar novo registro
 */
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactEmailExists = await ContactsRepository.findByEmail(email);
    if (contactEmailExists) {
      return response.status(400).json({ error: 'This e-mail is already been talken' });
    }

    if (category_id) {
      const category = await CategoriesRepository.findById(category_id);

      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return response.status(201).json(contact);
  }

  /**
 * Atualizar/Editar UM registro
 */
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id) {
      const category = await CategoriesRepository.findById(category_id);

      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactEmailExists = await ContactsRepository.findByEmail(email);

    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already been use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return response.json(contact);
  }

  /**
 * Remover 1 registro
 */
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);

    return response.status(200).json(contact.id);
  }
}

module.exports = new ContactController();
