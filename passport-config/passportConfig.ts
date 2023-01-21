import passport from "passport";
import passportGithub2 from "passport-github2";
const passportStrategy = new passportGithub2.Strategy(
  {
    clientID: "",
    clientSecret: "",
    callbackURL: "",
  },
  function (
    accessToken: string,
    refreshToken: string,
    profile: { [key: string]: string },
    done: (error: null, user: Express.User) => void
  ) {
    const user: Express.User = {
      username: profile.username,
    };
    done(null, user);
  }
);
passport.use(passportStrategy);
passport.serializeUser<Express.User>((user, done) => done(null, user)); //store user data in the session
passport.deserializeUser<Express.User>((user, done) => done(null, user)); //use our user stored data
export { passport };
