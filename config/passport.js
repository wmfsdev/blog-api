const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('local strat');
    try {
      const user = await User.findOne({ username });
      console.log('found user: ', user);
      if (!user) {
        console.log('user');
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log('fail');
        return done(null, false, { message: 'Incorrect password' });
      }
      console.log('user matches: ', user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'your-256-bit-secret';

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  console.log(jwt_payload);
  if (jwt_payload) {
    // sign
  }
  return done(null, jwt_payload);
  // User.find({ id: jwt_payload.sub }, (err, user) => {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   }
  //   return done(null, false);
  //   // or you could create a new account
  // });
}));

// might not need when we swap to jwt

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
