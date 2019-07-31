import routes from "../routes";
import Place from "../models/Place";
import { positions } from "../place";

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

export const getSearch = async (req, res) => {
  const {
    query: { keyword }
  } = req;
  res.render(PLACE_DIR + "placeSearch", { keyword });
};

export const postSearch = async (req, res) => {
  const {
    query: { keyword }
  } = req;
  try {
    console.log(positions);
    // videos = await Video.find({ title: { $regex: keyword, $options: "i" } });
    res.json({ places: positions });
  } catch (error) {
    console.log(error);
    res.json({ places: [] });
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
  const { body } = req;
  console.log(body);
  // To do DB Save
  res.status(200).send({ message: "ya" });
  // res.redirect(routes.place + routes.placeAdd);
};

export const placeFileUpload = (req, res) => {
  const { files } = req;
  console.log(files);
  // To do DB Save
  res.status(201).end();
};
