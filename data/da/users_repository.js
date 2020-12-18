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

  getUsers() {
    return this.da.all(
      `SELECT 
        users.id, users.first_name, users.last_name, users.email, users.gender, users.ip_addres
        , sum(users_statistic.page_views) as  total_page_views
        , sum(users_statistic.clicks) as  total_clicks
      FROM users 
      LEFT JOIN users_statistic on users.id = users_statistic.userId
      GROUP BY users.id, users.first_name, users.last_name, users.email, users.gender, users.ip_addres
      `
    );
  }
}

module.exports = UsersRepository;
