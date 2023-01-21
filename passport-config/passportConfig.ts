import passport from "passport";
import passportGithub2 from "passport-github2";
import config from "../config";
const passportStrategy = new passportGithub2.Strategy(
  {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
  },
  function (
    accessToken: string,
    refreshToken: string,
    profile: { [key: string]: string },
    done: (error: null, user: Express.User) => void
  ) {
    const user: Express.User = {
      username: profile.name,
    };
    done(null, user);
  }
);
passport.use(passportStrategy);
passport.serializeUser<Express.User>((user, done) => done(null, user)); //store user data in the session
passport.deserializeUser<Express.User>((user, done) => done(null, user)); //use our user stored data
export { passport };
