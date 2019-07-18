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
      // return res.json({ code: 401 });
      return res.status(400).end();
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).end();
    });
  })(req, res);

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
