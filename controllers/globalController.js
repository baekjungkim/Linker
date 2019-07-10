const POPUP_DIR = "popup/";

export const home = (req, res) => {
  res.render("home");
};

export const jusoPopup = (req, res) => {
  res.render(POPUP_DIR + "/jusoPopup");
};
