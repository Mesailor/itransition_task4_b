const express = require("express");
const cors = require("cors");
const app = express();
const dataBase = require("./dataBase");
const mongoose = require("mongoose");
const config = require("config");

const mongoCredentials = config.get("db_credentials");
const port = config.get("port");

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    let users = await dataBase.getAll();
    res.status(200).send(users);
  } catch {
    res.status(500).send({ message: "Sorry, something went wrong..." });
  }
});
app.post("/create-user", async (req, res) => {
  if (await dataBase.getUserByEmail(req.body.user.email)) {
    return res
      .status(400)
      .send({ message: "User with this email already exist!" });
  }
  try {
    const user = await dataBase.createUser(req.body.user);
    return res.status(200).send({ message: "User created succesfully!", user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.put("/update-status", async (req, res) => {
  try {
    let updatedUsers = await dataBase.updateStatus(
      req.body.ids,
      req.body.status
    );
    res.status(200).send({ message: "Updated successfully!", updatedUsers });
  } catch {
    res.status(500).send({ message: "Sorry, something went wrong..." });
  }
});
app.delete("/delete", async (req, res) => {
  try {
    let results = await dataBase.delete(req.body.ids);
    res.status(200).send({ message: "Deleted successfully", results });
  } catch {
    res.status(500).send({ message: "Sorry, something went wrong..." });
  }
});
app.post("/auth", async (req, res) => {
  let { email, password } = req.body.user; // create hash from req password

  const user = await dataBase.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res
      .status(400)
      .send({ message: "Wrong email or password!", result: false });
  }
  if (user.status !== "active") {
    return res.status(400).send({ message: "Sorry, your account is blocked!" });
  }

  try {
    await dataBase.updateLoginTime(email);
    res.status(200).send({
      message: "User authenticated!",
      result: true,
      user: user,
    });
  } catch {
    res.status(500).send({ message: "Sorry, something went wrong..." });
  }
});

const db_server = `mongodb+srv://${mongoCredentials}@firstcluster.5nrrz4c.mongodb.net/`;
mongoose
  .connect(db_server)
  .then(() => {
    console.log("Connected to DB...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Listen on port: ", port);
});
