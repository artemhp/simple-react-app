var express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.listen(3001, () => {

    app.get("/", (req, res, next) => {
        res.json(["Tony","Lisa","Michael","Ginger","Food"]);
    });

    app.post("/", (req, res, next) => {
        res.json(req.body);
    });

});