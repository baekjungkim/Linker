// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// User
const USER = "/user";
const USER_DETAIL = "/:id";
const USER_EDIT = "/edit";
const NOTIFICATION = "/notification";
const CHAT = "/chat";

// Place
const PLACE = "/place";
const PLACE_LIKE = "/like";
const PLACE_RECENT = "/recent";
const PLACE_ADD = "/add";
const PLACE_DETAIL = "/:id";
const PLACE_EDIT = "/edit/:id";
const MANAGE = "/manage";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  userDetail: USER_DETAIL,
  userEdit: USER_EDIT,
  notification: NOTIFICATION,
  chat: CHAT,
  place: PLACE,
  placeLike: PLACE_LIKE,
  placeRecent: PLACE_RECENT,
  placeAdd: PLACE_ADD,
  placeDetail: id => {
    if (id) {
      return PLACE + `${id}`;
    } else {
      return PLACE_DETAIL;
    }
  },
  placeEdit: PLACE_EDIT,
  manage: MANAGE
};

export default routes;
