const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controllers/users");

// To Display all the users
router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

// Operations on a single User
router
  .route("/:id")
  // To Get details of a particular User
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
