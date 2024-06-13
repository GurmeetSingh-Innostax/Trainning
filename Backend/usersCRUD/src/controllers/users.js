const client = require("../connection");

const handleGetAllUsers = async (req, res) => {
  console.log("Get Method Working for all users");
  const { query, params, headers } = req;
  const page = req.query.page || 1;
  const limit = 3;
  const offset = (page - 1) * limit;

  client
    .query(`SELECT * FROM users ORDER BY "userId" LIMIT $1 OFFSET $2`, [
      limit,
      offset,
    ])
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        data: result.rows,
        error: "No Error",
        page: page,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send("Server Side Error");
    })
    .finally(() => {
      console.log("Get Users Request Completed");
    });
};

const handleGetUserById = async (req, res) => {
  const userId = req.params.id;

  client
    .query(`SELECT * FROM users WHERE "userId"=$1 `, [userId])
    .then((result) => {
      console.log(result.rows[0]);
      if (typeof result.rows[0] === "undefined") {
        res.status(404).send(`There is no user exists with userId=${userId}`);
      } else {
        res.status(200).json({
          data: result.rows[0],
          error: "No Error",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send("Server Side Error");
    })
    .finally(() => {
      console.log("Get User Request Completed");
    });
};
const handleCreateNewUser = async (req, res) => {
  // To Insert a new User into Database
  console.log("Request Recieved at Post");
 
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const homeTown = req.body.homeTown;
  const gender = req.body.gender;
  const emailId = req.body.emailId;
  const password = req.body.password;

  client
    .query(
      `INSERT INTO users("firstName", "lastName", "age", "homeTown","gender","emailId","password") VALUES ($1, $2, $3, $4,$5,$6,$7)  RETURNING "userId"`,
      [firstName, lastName, age, homeTown, gender, emailId, password],
    )
    .then((result) => {
      console.log("I run"+result.rows);
      const insertedUserId = result.rows[0].userId;
      console.log(insertedUserId);
      res.status(200).send(`User Inserted at id:${insertedUserId}`);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(409).send("User ID already exists");
    })
    .finally(() => {
      console.log("Post Request Completed");
    });
};

const handleUpdateUserById = async (req, res) => {
  // To Update entry into Database
  const userId = req.params.id;
  const userjsonData = req.body;
  console.log("UserData" + JSON.stringify(userjsonData));
  client
    .query(`SELECT * FROM users WHERE "userId"=$1`, [userId])
    .then((result) => {
      if (typeof result.rows[0] === "undefined") {
        res.status(404).send(`There is no user exists with userId=${userId}`);
      } else {
        const DBJsonData = result.rows[0];
        console.log("DBObject" + JSON.stringify(DBJsonData));

        const mismatchedKeys = [];
        for (const key in userjsonData) {
          if (userjsonData.hasOwnProperty(key)) {
            if (DBJsonData[key] !== userjsonData[key]) {
              mismatchedKeys.push(key);
            }
          }
        }
        console.log(mismatchedKeys);
        for (let i = 0; i < mismatchedKeys.length; i++) {
          const key = mismatchedKeys[i];
          const value = userjsonData[key];
          client
            .query(
              `UPDATE users SET "${key}" = '${value}' WHERE "userId" = ${userId}`,
            )
            .then((result) => {
              console.log(mismatchedKeys[i] + " is updated");
            })
            .catch((error) => {
              console.log(error.message);
              res
                .status(500)
                .send("Issue at server end, can't update it at the moment!");
            })
            .finally(() => {});
        }

        res.status(200).send("User Updated Successfully");
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send("User data record not fetched at server!");
    })
    .finally(() => {
      console.log("PATCH Task completed");
    });
};

const handleDeleteUserById = async (req, res) => {
  const userId = req.params.id;
  // To delete an entry of user into database

  client
    .query(`DELETE FROM users WHERE "userId"=$1`, [userId])
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).send(`There is no user with userId=${userId}`);
      } else {
        console.log("Deleted: " + result.rows);
        res
          .status(200)
          .send(`Record with userId=${userId} is successfully removed`);
      }
    })

    .catch((error) => {
      console.log(error.message);
      res.status(500).send("Error while deleting record into the database.");
    })
    .finally(() => {
      console.log("Delete Request Completed ");
    });
};
module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateUserById,
  handleDeleteUserById,
};
