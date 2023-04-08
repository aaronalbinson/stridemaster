const passport = require('passport');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const { NextApiRequest, NextApiResponse } = require('next');

const CALLBACK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/fitbit/callback`;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FitbitStrategy(
    {
      clientID: process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID,
      clientSecret: process.env.FITBIT_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ['activity', 'heartrate', 'location', 'profile'],
    },
    function (accessToken, refreshToken, profile, done) {
      // Here, you can handle the user's Fitbit profile data and tokens.
      // Typically, you would save the tokens to a database and create a new user
      // in your own database if one doesn't exist yet, or update an existing user's
      // data if they are already registered.
      return done(null, { profile, accessToken, refreshToken });
    }
  )
);

export default function handler(req, res) {
  passport.authenticate('fitbit', { session: false })(req, res);
}
