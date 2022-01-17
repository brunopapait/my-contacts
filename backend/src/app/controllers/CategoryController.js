const CategoriesRepository = require('../repository/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    return response.json(categories);
  }

  // Error handler (Middleware express) -> Manipulador de erros

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    return response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);
    if (!category) {
      return response.status(404).json({ error: 'Category not found.' });
    }

    await CategoriesRepository.delete(id);

    return response.json(category.id);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(404).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.update(id, { name });

    return response.json(category);
  }
}

module.exports = new CategoryController();
