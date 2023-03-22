//https://github.com/bezkoder/node-js-jwt-authentication-postgresql

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Questions = db.activity

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and resync DB');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/activity.routes')(app)
require('./app/routes/stars.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  Questions.create({
      id: 1, 
      qtype: "q",
      urltitle: "bin_search",
      fulltitle: "Binary Search",
      qtext: "This is some question text about binary search, isn't it?",
      metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
  })

  Questions.create({
    id: 2, 
    qtype: "q",
    urltitle: "avl_trees",
    fulltitle: "AVL Trees",
    qtext: "This is some question text about AVL Trees, isn't it?",
    metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
  })

  Questions.create({
    id: 3, 
    qtype: "q",
    urltitle: "java_types",
    fulltitle: "Java Types",
    qtext: "This is some question text about Java types, isn't it?",
    metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
  })
}