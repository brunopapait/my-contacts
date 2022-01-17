const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM categories cat ORDER BY cat.name ${direction}`);
    return rows;
  }

  async create({
    name,
  }) {
    const [row] = await db.query(`INSERT INTO categories (name) VALUES ($1)
    RETURNING *`,
    [name]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM categories cat WHERE cat.id = $1', [id]);

    return deleteOp;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM categories cat WHERE cat.id = $1', [id]);

    return row;
  }

  async update(id, {
    name,
  }) {
    const [row] = await db.query(`UPDATE categories cat
    SET name = $1
    WHERE cat.id = $2
    RETURNING *`, [name, id]);

    return row;
  }
}

module.exports = new CategoriesRepository();
