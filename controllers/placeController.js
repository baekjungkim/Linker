import routes from "../routes";
import Place from "../models/Place";

const PLACE_DIR = "place/";

export const manage = async (req, res) => {
  try {
    const places = await Place.find({});
    res.render(PLACE_DIR + "manage", { places });
  } catch (error) {
    console.log(error);
    res.render(PLACE_DIR + "manage", { places: [] });
  }
};

export const placeDetail = (req, res) => {
  const {
    params: { id }
  } = req;
  res.render(PLACE_DIR + "placeDetail");
};

export const getPlaceAdd = (req, res) => {
  res.render(PLACE_DIR + "placeAdd");
};

export const postPlaceAdd = (req, res) => {
  const {
    body: { title, description }
  } = req;
  console.log(title);
  console.log(description);
  // To do DB Save
  res.redirect(routes.place + routes.placeAdd);
};

export const placeFileUpload = (req, res) => {
  const { files } = req;
  console.log(files);
  // To do DB Save
  res.status(201).end();
};
