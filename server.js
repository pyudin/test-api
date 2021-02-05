const express = require("express");
const app = express();
const users = require("./src/users");
const cors = require("cors");

app.use(cors());
app.use("/", express.static("public"));
app.use("/users", users);

app.listen(443, () => console.log("App is running on port 443"));
