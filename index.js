const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cookieParser = require('cookie-parser');
app.use(cookieParser('secure_bytes'));
const process = require('process');

const uri = "mongodb+srv://admin:admin@cluster0.dbot6fn.mongodb.net/bhargav?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port=process.env.PORT || 3000
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

client.connect((err) => {
  if (err) {
    console.log('Error connecting to MongoDB Atlas', err);
    return;
  }
  console.log('Connected to MongoDB Atlas');
  db = client.db("myproject").collection("project1");
});

// Set up middleware





app.use(
  session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: '234673302290-ic1oma4gm5cqkh33esukoej7tgpdnq43.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://signup-m5ho.onrender.com/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Serialize the complete profile object
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/signup.html'));
});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.sendFile(path.join(__dirname+'/signupimg.html')); 
  });


app.post('/', async (req, res) => {
  const objectLength = Object.keys(req.body).length;
  if (objectLength==0) {
    return res.redirect('/auth/google');
  }
  });



app.post('/signupimg', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname+'/simple.html'))
  });


    


app.listen(port, () => {
  console.log('Server started on port 3000!');
});



