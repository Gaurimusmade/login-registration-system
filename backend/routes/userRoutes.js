const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authToken = require("../middleware/authToken");

// *POST /user/register*: Allows a new user to create an account.
router.post("/register", userController.register);

// *POST /user/login*: Authenticates an existing user.
router.post("/login", userController.login);

// *GET /user/details*: Retrieves the details of the logged-in user.
router.get("/details", authToken, userController.getUserDetails);

module.exports = router;
