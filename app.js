//modules - A set of functions you want to include in your application
//Use the exports keyword to make properties and methods available outside the module file
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =  require('cors');
const passport = require('passport');
const mongoose =  require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});

//On error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

//port number
const port = 3000;
+
//cors middleware
app.use(cors());

//Set Static Folder to public
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
// app.use(bodyParser.json()); for Express 4.16 or lower
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//index route
app.get('/', (req,res)=>{
  res.send('Invalid Endpoint');
})

//Start Server
app.listen(port, () => {
  console.log('Server start on port ' + port);
});
