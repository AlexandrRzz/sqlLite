//const fs = require("fs");
const AppDA = require("./../da/da");
const UsersRepository = require("./../da/users_repository");
const UsersStatisticsRepository = require("./../da/users_statistic_repository");

const fs = require("fs"),
  path = require("path"),
  usersFilePath = path.join(__dirname, "users.json"),
  usersStatisticFilePath = path.join(__dirname, "users_statistic.json");

const da = new AppDA("./data/db/database.sqlite3");

const usersRepo = new UsersRepository(da);
da.checkTableExists("users").then((result) => {
  if (result.length === 0) {
    usersRepo.createTable().then(() => {
      fs.readFile(usersFilePath, { encoding: "utf-8" }, function (err, data) {
        if (!err) {
          const users = JSON.parse(data);
          users.forEach(
            ({ id, first_name, last_name, email, gender, ip_addres }) => {
              usersRepo.create(
                id,
                first_name,
                last_name,
                email,
                gender,
                ip_addres
              );
            }
          );
        } else {
          console.log(err);
        }
      });
    });
  }
});

const usersStatisticsRepo = new UsersStatisticsRepository(da);

da.checkTableExists("users_statistic").then((result) => {
  if (result.length === 0) {
    usersStatisticsRepo.createTable().then(() => {
      fs.readFile(
        usersStatisticFilePath,
        { encoding: "utf-8" },
        function (err, data) {
          if (!err) {
            const usersStatistic = JSON.parse(data);
            usersStatistic.forEach(({ user_id, date, page_views, clicks }) => {
              usersStatisticsRepo.create(user_id, date, page_views, clicks);
            });
          } else {
            console.log(err);
          }
        }
      );
    });
  }
});
