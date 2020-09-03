const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request-promise');
const chance = require('chance').Chance();
const cache = require('memory-cache');
const contentful = require('contentful');

const client = contentful.createClient({
  space: 'mk4lvaz91swy',
  accessToken: 'Cnsx50UrSqSNXavrTLIhwVw05xPXCH2GD775ETPOnLQ',
});

const app = express();

const enableHogwartsAPI = false;

const apiPexels = {
  getImagesUrl: 'https://api.pexels.com/v1/search?query=face face&per_page=40',
  headers: {
    headers: {
      Authorization: '563492ad6f917000010000012e8212f2d12d4db6aa556721d7b187a5',
    },
  },
};
const mockPlaceholderForPexelsImage = {
  photos: [{ src: { landscape: 'https://dummyimage.com/800x600/363636/fafafa' } }],
};
const mockHogwartsHouse = () => ['Griffindor', 'Slytherin', 'Hafflepuff', 'Ravenclaw'][chance.integer({ min: 0, max: 3 })];

const user = async details => {
  let house;
  try {
    if (!enableHogwartsAPI) throw 'Hogwarts API is disabled!';
    house = (await request.get('https://www.potterapi.com/v1/sortingHat')).slice(1, -1);
  } catch (error) {
    house = mockHogwartsHouse();
  }

  if (!cache.get('image')) {
    try {
      const { getImagesUrl, headers } = apiPexels;
      cache.put('image', JSON.parse(await request.get(getImagesUrl, headers)));
    } catch (error) {
      cache.put('image', mockPlaceholderForPexelsImage);
    }
  }

  return {
    image: cache.get('image').photos[Math.floor(Math.random() * cache.get('image').photos.length)].src.landscape,
    name: chance.name({ gender: 'female' }),
    owl: chance.email({ domain: 'hogwarts.uk' }),
    dob: chance.date({ year: 2015 }),
    rate: chance.integer({ min: 50, max: 300 }),
    year: chance.integer({ min: 2015, max: 2020 }),
    id: chance.integer({ min: 10000, max: 9999999 }),
    story: chance.paragraph({ sentences: 10 }),
    house,
  };
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
  app.get('/assets', (req, res, next) => {
    client
      .getEntry('iP1ebfHrDiXirTHxJ1XGl')
      .then(response => {
        const content = response && response.fields && response.fields[req.query.content];
        res.json({ content });
      })
      .catch(console.error);
  });

  app.get('/items', async (req, res, next) => {
    const list = [];
    try {
      for await (const num of new Array(20)) {
        list.push(await user(true));
      }
      res.json(list);
    } catch (error) {
      res.status(500).send('Oh uh, something went wrong');
    }
  });
  app.post('/items', (req, res, next) => {
    res.json(req.body);
  });
  app.get('/items/:id', async (req, res, next) => {
    res.json(await user(true));
  });
  app.put('/items/:id', (req, res, next) => {
    res.json(user(true));
  });
  app.patch('/items/:id', (req, res, next) => {
    res.json(user(true));
  });
});
