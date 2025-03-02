import initDB from "../config/db.js";

class ExpenseModel {
  static async createTable() {
    const db = await initDB();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL
      );
    `);
  }

  static async getByDateRange(startDate, endDate) {
    const db = await initDB();
    return db.all("SELECT * FROM expenses WHERE date BETWEEN ? AND ? ORDER BY date DESC", [startDate, endDate]);
  }
  
  static async getAll() {
    const db = await initDB();
    return db.all("SELECT * FROM expenses ORDER BY date DESC");
  }

  static async create({ description, amount, date }) {
    const db = await initDB();
    const result = await db.run(
      "INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)",
      [description, amount, date]
    );
    return { id: result.lastID, description, amount, date };
  }

  static async delete(id) {
    const db = await initDB();
    await db.run("DELETE FROM expenses WHERE id = ?", [id]);
  }

  static async deleteAll() {
    const db = await initDB();
    await db.run("DELETE FROM expenses");
  }

}

export default ExpenseModel;
