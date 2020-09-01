require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/dbConnection');
var bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit-middleware').rateLimit
const helmet = require('helmet');
const generateData = require('./api/generateData/index');
let mongoose = require('mongoose');
var schedule = require('node-schedule');
var commands = require('./commands/removeMovieByDate');

const passport = require('passport');
// Main app
var app = express();

//Use hamlet 
app.use(helmet())

// Initialize passprt
app.use(passport.initialize());

// Logs
app.use(logger('dev'));

// important if behind a proxy to ensure client IP is passed to req.ip
//app.enable('trust proxy'); 


//Map global promise
mongoose.Promise = global.Promise;


// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Limit request per ip address
//app.use(rateLimiter({
//  limit: 1000, 
//  reset: '1 hour'
//}))


// Fix CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
    return res.status(200).json({});
  };
  next();
});

// Routes
var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');
var materialsRouter = require('./api/routes/materials');
var categoryRouter = require('./api/routes/category');
var dashboardRouter = require('./api/routes/dashboard');
var productRouter = require('./api/routes/products');
var moviesRouter = require('./api/routes/movie');

// Open connection to the database
db.once('open', function () {
  console.log('Connected to mongodb!');
});

// Catch errors on database connection failure
db.on('error', function (err) {
  console.log('Error while connecting to database: ', err)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Call routes API
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/materials', materialsRouter);
app.use('/category', categoryRouter);
app.use('/dashboard', dashboardRouter);
app.use('/products', productRouter);
app.use('/movies', moviesRouter);


//Genearte Data
generateData.generateData();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Schedule corn like tab
// [ENCH MINUT FOR TEST] var j = schedule.scheduleJob('* * * * *', function () {
var j = schedule.scheduleJob('* * 1 * *', function () {
  console.log('Monthly cron tab like to remove not seen movies for one month !');
  commands.removeMovieByDate()
});

module.exports = app;
