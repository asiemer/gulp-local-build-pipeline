/* global require */

const express = require("express");
const app = express();

app.use(express.static("app/static"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("Good day mate!");
});

app.get("/bird", (req, res) => {
	res.json("I'm out of here!");
});

app.get("/dog", (req, res) => {
	res.json("I eat cats! ..and rabbits!");
});

app.get("/cat", (req, res) => {
	res.json("I eat birds!");
});

app.get("/rabbit", (req, res) => {
	res.json("Give me carrots!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
