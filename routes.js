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
const SMS_REQUEST = "/smsRequest";

// Place
const PLACE = "/place";
const PLACE_LIKE = "/like";
const PLACE_RECENT = "/recent";
const PLACE_ADD = "/add";
const PLACE_DETAIL = "/:id";
const PLACE_EDIT = "/edit/:id";
const PLACE_FILE_UPLOAD = "/file-upload";
const MANAGE = "/manage";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// Kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

// Naver
const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

// Google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  userDetail: USER_DETAIL,
  userEdit: USER_EDIT,
  smsRequest: SMS_REQUEST,
  notification: NOTIFICATION,
  chat: CHAT,
  place: PLACE,
  placeLike: PLACE_LIKE,
  placeRecent: PLACE_RECENT,
  placeAdd: PLACE_ADD,
  placeFileUpload: PLACE_FILE_UPLOAD,
  placeDetail: id => {
    if (id) {
      return PLACE + `${id}`;
    } else {
      return PLACE_DETAIL;
    }
  },
  placeEdit: PLACE_EDIT,
  manage: MANAGE,
  facebook: FACEBOOK,
  facebookCallBack: FACEBOOK_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK
};

export default routes;
