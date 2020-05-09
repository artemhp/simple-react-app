var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const request = require("request-promise");
const chance = require("chance").Chance();

var app = express();

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.listen(3001, () => {
  app.get("/", async (req, res, next) => {
    const list = Array.from({ length: 12 }, async (el, index) => ({
      // image: JSON.parse(await request.get("https://randomfox.ca/floof/")).image,
      // image: `https://picsum.photos/400/300?random=${Math.random()}`,
      image: "https://dummyimage.com/800x600/363636/fafafa",
      userName: chance.name(),
      userEmail: chance.email(),
      userPhone: chance.phone(),
      userDob: chance.date(),
      story: chance.paragraph(),
    }));
    res.json(await Promise.all(list));
  });

  app.post("/", (req, res, next) => {
    res.json(req.body);
  });
});
