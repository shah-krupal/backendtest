// --------------------- Requires --------------------------

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/employee.model');

const usersRoute = require('./routes/index.js');
const employee = require('./routes/employee')
const leaveApplication = require('./routes/leaveApplication')
const manager = require('./routes/manager');
const login = require('./routes/login');

const session = require('express-session');

const passport = require('passport');
const localStrategy = require('passport-local');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || "8000";


// ----------------------------------------------------------


const app = express();


// --------------------- Midleware --------------------------

app.use(express.urlencoded({extended:true}));
app.use(express.json()) ;

// ----------------------------------------------------------




// --------------- Connecting Database -----------------------

mongoose.Promise = global.Promise;
const dbURI = process.env.DB_URI ;

// mongoose
// .connect(dbURI, {
//     useNewUrlParser: true,
// })
// .then(()=>console.log("Database connection successful"))
// .catch((err)=>{console.log(err)}) ;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.DB_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });




// -----------------------------------------------------------




// --------------- configuring session -----------------------

// const sessionConfig = {
//     secret: 'itisasecret',
//     cookie: {
//         expires: Date.now() + 1000*60*60*24*3,
//         maxAge: 1000*60*60*24*3
//     },
//     resave: false,
//     saveUninitialized: true
// }

// app.use(session(sessionConfig));

// -------------------------------------------------------------



// --------------- configuring passsport -----------------------

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new localStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// -------------------------------------------------------------


const corsOptions = {
    origin:function(origin, callback){
      if(allowedOrigins.indexOf(origin) !== -1 || !origin){
        callback(null, true);
    }
    else{
        callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  preflightContinue: false,
  OptionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use('/', usersRoute);
app.use('/', login);
app.use('/employee', employee);
app.use('/leave', leaveApplication);
app.use('/manager', manager);
app.use('/login', login);

module.exports = app;

app.listen(port,()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
}); 