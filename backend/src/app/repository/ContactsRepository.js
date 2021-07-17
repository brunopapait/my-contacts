const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT con.*, cat.name AS category_name
    FROM contacts con
    LEFT JOIN categories cat
    ON cat.id = con.category_id
    ORDER BY con.name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT con.*, cat.name AS category_name
    FROM contacts con
    LEFT JOIN categories cat
    ON cat.id = con.category_id
    WHERE con.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts con WHERE con.email = $1', [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`INSERT INTO contacts (name, email, phone, category_id)
    values ($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts con
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE con.id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts con WHERE con.id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new ContactsRepository();
