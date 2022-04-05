const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// go to https://console.cloud.google.com/apis/credentials  >> create -  OAuth 2.0 Client IDs
// set client and secretId
const GOOGLE_CLIENT_ID = '234529432792-vjnd8r9neu49bdi50lqfc3j39f96uo9i.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
  (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
