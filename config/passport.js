const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      console.log('local auth user: ', user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'your-256-bit-secret';

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    try {
    //  console.log('payload ', jwt_payload); // {userId and iat}
      return done(null, jwt_payload, { message: 'authorised', status: 200 });
    } catch (error) {
      done(error);
    }
  }),
);
