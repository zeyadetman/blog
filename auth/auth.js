const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async ({ body }, username, password, done) => {
      try {
        const user = await UserModel.create({ ...body });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log(username, password);
      try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found", status: 404 });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password", status: 401 });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTstrategy(
    {
      secretOrKey: process.env.API_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("Authorization"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
