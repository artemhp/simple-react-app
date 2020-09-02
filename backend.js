var express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const request = require("request-promise");
const chance = require("chance").Chance();
const cache = require("memory-cache");

var app = express();

const enableHogwartsAPI = false;

const apiPexels = {
  getImagesUrl: "https://api.pexels.com/v1/search?query=face face&per_page=40",
  headers: {
    headers: {
      Authorization:
        "563492ad6f917000010000012e8212f2d12d4db6aa556721d7b187a5",
    },
  }
}
const mockPlaceholderForPexelsImage = { photos: [{ src: { landscape: 'https://dummyimage.com/800x600/363636/fafafa' } }]}
const mockHogwartsHouse = () => ['Griffindor', 'Slytherin', 'Hafflepuff', 'Ravenclaw'][chance.integer({ min: 0, max: 3 })]

const user = async (details) => {

  let house;
  try {
    if (!enableHogwartsAPI) throw 'Hogwarts API is disabled!';
    house = (await request.get("https://www.potterapi.com/v1/sortingHat")).slice(1, -1);
  } catch (error) {
    house = mockHogwartsHouse();
  }

  if (!cache.get("image")) {
    try {
      const {getImagesUrl, headers} = apiPexels;
      cache.put("image", JSON.parse(await request.get(getImagesUrl, headers)));
    } catch (error) {
      cache.put("image", mockPlaceholderForPexelsImage);
    }
  }

  return {
    image: cache.get("image").photos[Math.floor( Math.random() * cache.get("image").photos.length )].src.landscape,
    name: chance.name({ gender: "female" }),
    owl: chance.email({ domain: "hogwarts.uk" }),
    dob: chance.date({year: 2015}),
    rate: chance.integer({ min: 50, max: 300 }),
    year: chance.integer({ min: 2015, max: 2020 }),
    id: chance.integer({ min: 10000, max: 9999999 }),
    story: chance.paragraph({ sentences: 10 }),
    house: house
  };
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
  app.get("/about", (req, res, next) => {
    res.json({
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Summus dolor plures dies manere non potest? Atque his de rebus et splendida est eorum et illustris oratio. Duo Reges: constructio interrete. Et certamen honestum et disputatio splendida! omnis est enim de virtutis dignitate contentio. <a href="http://loripsum.net/" target="_blank">Sed residamus, inquit, si placet.</a> Occultum facinus esse potuerit, gaudebit; Quid enim est a Chrysippo praetermissum in Stoicis? <i>At ille pellit, qui permulcet sensum voluptate.</i> </p>
        <p>Nihil enim iam habes, quod ad corpus referas; Ita relinquet duas, de quibus etiam atque etiam consideret. Et quidem Arcesilas tuus, etsi fuit in disserendo pertinacior, tamen noster fuit; Quo studio Aristophanem putamus aetatem in litteris duxisse? Cum salvum esse flentes sui respondissent, rogavit essentne fusi hostes. Itaque sensibus rationem adiunxit et ratione effecta sensus non reliquit. <i>Ut aliquid scire se gaudeant?</i> Nam Pyrrho, Aristo, Erillus iam diu abiecti. </p>
        <p>Perturbationes autem nulla naturae vi commoventur, omniaque ea sunt opiniones ac iudicia levitatis. <a href="http://loripsum.net/" target="_blank">Quid ad utilitatem tantae pecuniae?</a> <b>Ad eos igitur converte te, quaeso.</b> At enim hic etiam dolore. <a href="http://loripsum.net/" target="_blank">Immo alio genere;</a> <mark>Primum quid tu dicis breve?</mark> </p>
        <p>Cur igitur, cum de re conveniat, non malumus usitate loqui? Sed haec quidem liberius ab eo dicuntur et saepius. <a href="http://loripsum.net/" target="_blank">Quid de Platone aut de Democrito loquar?</a> <a href="http://loripsum.net/" target="_blank">Aliter homines, aliter philosophos loqui putas oportere?</a> At multis se probavit. <b>Quo tandem modo?</b> Urgent tamen et nihil remittunt. </p>
        <p><a href="http://loripsum.net/" target="_blank">Sed haec omittamus;</a> <i>Utram tandem linguam nescio?</i> Non enim solum Torquatus dixit quid sentiret, sed etiam cur. Potius ergo illa dicantur: turpe esse, viri non esse debilitari dolore, frangi, succumbere. Mihi quidem Antiochum, quem audis, satis belle videris attendere. Nondum autem explanatum satis, erat, quid maxime natura vellet. Nonne igitur tibi videntur, inquit, mala? Etenim semper illud extra est, quod arte comprehenditur. </p>
        <p>Igitur neque stultorum quisquam beatus neque sapientium non beatus. Duarum enim vitarum nobis erunt instituta capienda. Quorum sine causa fieri nihil putandum est. Haeret in salebra. Graece donan, Latine voluptatem vocant. Dicimus aliquem hilare vivere; Atque haec ita iustitiae propria sunt, ut sint virtutum reliquarum communia. </p>
      `,
    });
  });

  app.get("/items", async (req, res, next) => {
    let list = [];
    try {
      for await (let num of new Array(20)) { list.push(await user(true)); }
      res.json(list);
    } catch (error) {
      res.status(500).send("Oh uh, something went wrong");
    }
  });
  app.post("/items", (req, res, next) => {
    res.json(req.body);
  });
  app.get("/items/:id", async (req, res, next) => {
    res.json(await user(true));
  });
  app.put("/items/:id", (req, res, next) => {
    res.json(user(true));
  });
  app.patch("/items/:id", (req, res, next) => {
    res.json(user(true));
  });
});
