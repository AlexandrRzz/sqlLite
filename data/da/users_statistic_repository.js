class UsersStatisticRepository {
  constructor(da) {
    this.da = da;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users_statistic (
        userId INTEGER,
        date TEXT,
        page_views INTEGER DEFAULT 0,
        clicks INTEGER DEFAULT 0,
        CONSTRAINT users_statistic_pk PRIMARY KEY (userId, date)
        CONSTRAINT users_statistic_fk_userId FOREIGN KEY (userId)
          REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    return this.da.run(sql);
  }

  create(userId, date, page_views, clicks) {
    return this.da.run(
      "INSERT INTO users_statistic (userId, date, page_views, clicks) VALUES (?, ?, ?, ?)",
      [userId, date, page_views, clicks]
    );
  }

  getStatisticById(id, date_from = "2019-10-01", date_to = "2019-10-31") {
    return this.da.all(
      `SELECT * FROM users_statistic WHERE userId = ? AND date BETWEEN ? AND ?`,
      [id, date_from, date_to]
    );
  }
}

module.exports = UsersStatisticRepository;
