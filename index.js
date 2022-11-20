const express = require("express");

const app = express();

const port = process.env.PORT || "8000";

app.get("/", (req, res) => {
  res.send("<h1> Hello from index </h1>");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
