const HOME = "/";
const DETAIL = "/:id";
const JOIN = "/join";
const LOGIN = "/login";
const SEARCH = "/search";
const USER = "/user";
const LIKE = "/like";
const RECENT = "/recent";
const HOUSE = "/house";
const OFFICE = "/office";
const ADD = "/add";
const EDIT = "/edit";
const NOTIFICATION = "/notification";
const CHAT = "/chat";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  user: USER,
  search: SEARCH,
  house_detail: HOUSE + DETAIL,
  office_detail: OFFICE + DETAIL,
  house_add: HOUSE + ADD,
  office_add: OFFICE + ADD,
  house_edit: HOUSE + DETAIL + EDIT,
  office_edit: OFFICE + DETAIL + EDIT,
  house_recent: LIKE + HOUSE + RECENT,
  office_recent: LIKE + OFFICE + RECENT,
  notification: NOTIFICATION,
  chat: NOTIFICATION + CHAT
};

export default routes;
