const express = require("express");
const app = express();
const users = require("./src/users");
const cors = require("cors");

app.use(cors());
app.use("/", express.static("public"));
app.use("/api/users", users);

app.listen(process.env.PORT || 8090, () =>
  console.log("App is running on port 8090")
);
