const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request-promise');
const chance = require('chance').Chance();
const cache = require('memory-cache');
const contentful = require('contentful');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const client = contentful.createClient({
  space: 'mk4lvaz91swy',
  accessToken: 'Cnsx50UrSqSNXavrTLIhwVw05xPXCH2GD775ETPOnLQ',
});

const users = [
  { id: 1, user: 'admin', password: 'admin' },
  { id: 2, user: 'guest', password: 'guest' },
];

const app = express();
const PORT = process.env.PORT || 4444;

const enableHogwartsAPI = false;

const apiPexels = {
  getImagesUrl: 'https://api.pexels.com/v1/search?query=nature&per_page=40',
  headers: {
    headers: {
      Authorization: '563492ad6f917000010000012e8212f2d12d4db6aa556721d7b187a5',
    },
  },
};
const mockPlaceholderForPexelsImage = {
  photos: [{ src: { landscape: 'https://dummyimage.com/800x600/363636/fafafa' } }],
};
const mockHogwartsHouse = () => {
  return ['Griffindor', 'Slytherin', 'Hafflepuff', 'Ravenclaw'][chance.integer({ min: 0, max: 3 })];
};

const user = async () => {
  let house;
  try {
    if (!enableHogwartsAPI) throw new Error('Hogwarts API is disabled!');
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

const jwtCheck = expressJwt({ secret: 'mySuperSecretKey', algorithms: ['HS256'] });

app.listen(PORT, () => {
  app.get('/assets', (req, res) => {
    client
      .getEntry('iP1ebfHrDiXirTHxJ1XGl')
      .then(response => {
        const content = response && response.fields && response.fields[req.query.content];
        res.json({ content });
      })
      .catch(console.error);
  });

  app.get('/items', jwtCheck, async (req, res) => {
    const list = [];
    try {
      // eslint-disable-next-line no-restricted-syntax
      for await (let num of new Array(20)) {
        list.push(await user(true));
      }
      res.json(list);
    } catch (error) {
      res.status(500).send('Oh uh, something went wrong');
    }
  });
  app.post('/items', jwtCheck, (req, res) => {
    res.json(req.body);
  });

  app.post('/login', (req, res) => {
    if (req && req.body && !req.body.user) {
      res.status(401).send('Input User and Password');
    }
    const currentUser = req.body.user;
    const currentPassword = req.body.password;
    const listOfUsers = users.filter(el => el.user === currentUser && el.password === currentPassword);
    const isUser = !!listOfUsers.length;
    if (!isUser) {
      res.status(401).send('User not found');
      return;
    }
    const token = jwt.sign({ sub: user.id, username: user.username }, 'mySuperSecretKey');
    res.status(200).send({ access_token: token });
  });

  app.get('/items/:id', jwtCheck, async (req, res) => {
    res.json(await user(true));
  });
  app.put('/items/:id', jwtCheck, (req, res) => {
    res.json(user(true));
  });
  app.patch('/items/:id', jwtCheck, (req, res) => {
    res.json(user(true));
  });
});
