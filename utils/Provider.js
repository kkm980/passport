import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
// import { User } from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "415607369128-qnj90obcj6lq10bumn3qbd5q3ijreb04.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000",
      },
      async function (accessToken, refreshToken, profile, done) {
        // const user = await User.findOne({
        //   googleId: profile.id,
        // });

        if (true) {
          const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          };

          return done(null, newUser);
        } else {
          return done(null, "user");
        }
        return done(null, "abc")
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await user.findById(id);
    done(null, user);
  });
};