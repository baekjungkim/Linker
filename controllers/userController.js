import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, phoneNumber }
  } = req;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400).end();
  } else {
    try {
      user = await User({
        name,
        email,
        phoneNumber,
        country: "+82"
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLogin = (req, res) => res.render("login");

// export const postLogin = passport.authenticate("local", {
//   failureRedirect: routes.login,
//   successRedirect: routes.home
// });
export const postLogin = (req, res) =>
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("400");
      // return res.json({ code: 401 });
      return res.status(400).end();
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.status(200).end();
    });
  })(req, res);

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      id,
      kaccount_email: email,
      properties: { profile_image: avatarUrl, nickname: name }
    }
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, email, nickname: name, profile_image: avatarUrl }
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      naverId: id,
      avatarUrl
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const googleLogin = passport.authenticate("google");

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub: id, email, name, picture: avatarUrl }
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postSocialLogin = (req, res) => {
  let path = routes.home;
  if (req.cookies.prevUrl) {
    path = req.cookies.prevUrl;
    res.clearCookie("prevUrl");
  }
  res.redirect(path);
};
