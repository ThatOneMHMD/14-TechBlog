// import data
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const chalk = require('chalk');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// use middleware and env/DB credintionals
const app = express();
const PORT = process.env.PORT || 3000;

// config session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Create an instance of the Handlebars engine
const hbs = exphbs.create();

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// prevents useless query text (loggin to false)
sequelize.sync({ force: false, logging: false }).then(() => {
  app.listen(PORT, () =>
    console.log(chalk.green(`App listening at http://localhost:${PORT} !!!!!`))
  );
});
