const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('local strat');
    try {
      const user = await User.findOne({ username });
      //  console.log('found user: ', user);
      if (!user) {
        //    console.log('user');
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        //    console.log('fail');
        return done(null, false, { message: 'Incorrect password' });
      }
      //   console.log('user matches: ', user);
      return done(null, user);
    } catch (err) {
    //  console.log('bad login');
      return done(err);
    }
  }),
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'your-256-bit-secret';

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('jwt strat');
    console.log(jwt_payload);
    try {
      console.log('null');
      return done(null, jwt_payload, { message: 'authorised' });
    } catch (error) {
      console.log('dsf');
      done(error);
    }
  }),
);
