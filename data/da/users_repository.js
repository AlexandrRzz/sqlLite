class UsersRepository {
  constructor(da) {
    this.da = da;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY ,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      gender TEXT,
      ip_addres TEXT
      )`;
    return this.da.run(sql);
  }

  create(id, first_name, last_name, email, gender, ip_addres) {
    return this.da.run(
      "INSERT INTO users (id, first_name, last_name, email, gender, ip_addres) VALUES (?, ?, ?, ?,?, ?)",
      [id, first_name, last_name, email, gender, ip_addres]
    );
  }
}

module.exports = UsersRepository;
