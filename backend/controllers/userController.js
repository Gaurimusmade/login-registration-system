const User = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. *POST /users/register*: Allows a new user to create an account.
module.exports.register = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    if (!(name && dob && email && password)) {
      res.status(400).send({ Message: "All fields are compulsory." });
    }
    if ((await User.isUserExists(name, email)) == true) {
      return res
        .status(409)
        .json({ message: "Username already exists, try with different" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userData = {
      ...req.body,
      password: hashPassword,
    };
    await User.newUser(userData);
    let token = jwt.sign({ ...userData }, process.env.TOKEN_SECRET, {});
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. *POST /users/login*: Authenticates an existing user.
module.exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userData = await User.varifyUser(name, password);
    if (userData == null) {
      return res
        .status(401)
        .json({ message: "Username and password does not match" });
    }
    let token = jwt.sign({ ...userData }, process.env.TOKEN_SECRET, {});
    return res.status(200).json({ message: "User login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// 3.*GET /users/details*: Retrieves the details of the all users.
module.exports.getUserDetails = async (req, res) => {
  try {
    const customersData = [
      {
        company: "Alfreds Futterkiste",
        contact: "Maria Anders",
        country: "Germany",
      },
      {
        company: "Berglunds snabbköp",
        contact: "Christina Berglund",
        country: "Sweden",
      },
      {
        company: "Centro comercial Moctezuma",
        contact: "Francisco Chang",
        country: "Mexico",
      },
      { company: "Ernst Handel", contact: "Roland Mendel", country: "Austria" },
      { company: "Island Trading", contact: "Helen Bennett", country: "UK" },
      {
        company: "Königlich Essen",
        contact: "Philip Cramer",
        country: "Germany",
      },
      {
        company: "Laughing Bacchus Winecellars",
        contact: "Yoshi Tannamuri",
        country: "Canada",
      },
      {
        company: "Magazzini Alimentari Riuniti",
        contact: "Giovanni Rovelli",
        country: "Italy",
      },
      { company: "North/South", contact: "Simon Crowther", country: "UK" },
      {
        company: "Paris spécialités",
        contact: "Marie Bertrand",
        country: "France",
      },
    ];
    res.status(200).json({ customersData });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
