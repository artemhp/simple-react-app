var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const request = require("request-promise");
const chance = require("chance").Chance();

var app = express();

const user = (details) => ({
  image: "https://dummyimage.com/800x600/363636/fafafa",
  userName: chance.name(),
  userEmail: chance.email(),
  userPhone: chance.phone(),
  userDob: chance.date(),
  story: details && chance.paragraph(),
  id: chance.integer({ min: 10000, max: 99999 }),
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(3001, () => {
  app.get("/items", (req, res, next) => {
    res.json(Array.from({ length: 300 }, (el) => user()));
  });
  app.post("/items", (req, res, next) => {
    res.json(req.body);
  });
  app.get("/items/:id", (req, res, next) => {
    res.json(user(true));
  });
  app.put("/items/:id", (req, res, next) => {
    res.json(user(true));
  });
  app.patch("/items/:id", (req, res, next) => {
    res.json(user(true));
  });
});
