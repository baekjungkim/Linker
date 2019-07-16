const POPUP_DIR = "popup/";

export const home = (req, res) => {
  res.render("home");
};

export const getJoin = (req, res) => res.render("join");

export const getLogin = (req, res) => res.render("login");
