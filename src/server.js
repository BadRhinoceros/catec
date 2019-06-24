const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const request = require('request-promise');

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb+srv://admin:Mdb12812122424@@cluster0-o83lo.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
const app = express();
let dbClient;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); /* подключение модулей */

app.use(express.static('public/images'));

app.use(session({ // настройка сессий
  secret: 'newSecret',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => { // вывод информации о запросах
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/src/dist/bundle.js', (req, res) => { // отправка скомпилированного файла
  res.sendFile(__dirname + '/dist/bundle.js');
});
app.get('/src/dist/bundle.js.map', (req, res) => { // отправка скомпилированного файла
  res.sendFile(__dirname + '/dist/bundle.js.map');
});

mongoClient.connect((err, client) => { // Подключение БД и запуск сервера
  if (err) return console.log(err);
  dbClient = client;
  app.locals.usersCollection = client.db('testDip').collection('users'); // база testDip, "таблица" users
  app.listen(process.env.PORT || 4000, () => {
    console.log('Сервер запущен');
  });
});

app.post('/checkUser', (req, res) => { // проверка на наличие аккаунта в базе для отправки кода
  const { login } = req.body;
  let user = {
    login: login,
  }
  console.log(user);
  const collection = app.locals.usersCollection;

  collection.findOne(user, (err, result) => {
    if (err) return console.log(err);
    if (result) {
      res.send({userAvailable: true});
    } else {
      res.send({userAvailable: false});
    }
  })
})

app.post('/checkUserForConnect', (req, res) => { // проверка на наличие аккаунта в базе для отправки кода
  const { login,password } = req.body;
  let user = {
    login: login,
    password: password
  }
  const collection = app.locals.usersCollection;

  collection.findOne(user, (err, result) => {
    if (err) return console.log(err);
    if (result) {
      res.send({userAvailable: true});
    } else {
      res.send({userAvailable: false});
    }
  })
})

app.post('/checkCodeWithData', (req, res) => { // проверка введенного кода
  const { login,password,code } = req.body;
  const collection = app.locals.usersCollection;
  let user = {
    login: login,
    password: password,
  }

  collection.findOne(user, (err, result) => {
    if (err) return console.log(err);
      if (result) {
        const options = { // настройка запроса на сервер с генерацией пароля
          method: 'POST',
          // uri: 'http://192.168.43.22:3000/checkCodeWithData',
          uri: 'https://twofactorbase.herokuapp.com/checkCodeWithData',
          body: {
            login: login
          },
          json: true
        }

        request(options) // отправка запроса на сервер с генерацией пароля
          .then((response) => {
            console.log(response);
            if (response.codeS) {
              const { codeS } = response;
              console.log('Пришедший код: ' + codeS);
              console.log('Введенный код: ' + code);
              if (codeS == code) {
                req.session.authorized = true;
                req.session.userlogin = login;
                res.send({ authorized: true, profileName: req.session.userlogin })
              } else {
                res.send({ authorized: false })
              }
            } else {
              res.send({ authorized: false })
            }
          })
          .catch((err) => {
            if (err) return console.log(err);
          })
      }
    })
})

app.post('/authorization', (req, res) => { // авторизация пользователя
  const { login,password } = req.body;
  const collection = app.locals.usersCollection;
  let user = {
    login: login,
    password: password
  }

  collection.findOne(user, (err, result) => { // поиск в бд
    if (err) return console.log(err);
    console.log(result);
      if (result) {
        console.log("Такой есть");
        res.send({ userExists: true });
      } else {
        console.log("Такого нет");
        res.send({ userExists: false });
      }
    })
});

app.post('/registration', (req, res) => { // регистрация пользователя
  console.log(req.body);
  const { login,password } = req.body;
  const user = { login: login, password: password };

  const collection = app.locals.usersCollection;
  collection.insertOne(user, (err, result) => { // добавление в бд
    if (err) return console.log(err);
    console.log('Пользователь добавлен');
    res.send({ registrationSuccess: true });
  });
});

app.get('/checkSession', (req, res) => { // проверка сессии
  if (req.session.authorized) {
    res.send({ authorized: true, profileName: req.session.userlogin });
  } else {
    res.send({ authorized: false });
  }
  console.log(req.session);
});

app.get('/logout', (req, res) => { // выход из аккаунта
  delete req.session.authorized;
  delete req.session.userlogin;
  res.send({ authorized: false, profileName: '' });
})

app.get('/', (req, res) => { // отризавка html файла
  console.log(req.session);
  res.render('index.ejs');
});

process.on("SIGINT", () => { // отключение бд при исполнении в консоли команды "ctrl+c"
  dbClient.close();
  process.exit();
});
