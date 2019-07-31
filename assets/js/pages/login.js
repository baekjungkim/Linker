import axios from "axios";
import toastr from "toastr";
import routes from "../../../routes";

const jsLoginFormContainer = document.getElementById("jsLoginFormContainer");
const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");

const chkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

function loginFormCheck() {
  if (!email.value) {
    toastr.error("이메일을 입력해 주세요.");
    email.focus();
    return false;
  } else if (!chkEmail.test(email.value)) {
    toastr.error("이메일을 다시 입력해 주세요.");
    email.value = "";
    email.focus();
    return false;
  } else if (!password.value) {
    toastr.error("비밀번호를 입력해 주세요.");
    password.focus();
    return false;
  } else {
    return true;
  }
}

function loginSubmit() {
  var data = $("#loginForm").serialize();
  axios({
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    method: "post",
    url: routes.login,
    responseType: "json",
    data
  })
    .then(function(response) {
      if (getCookie("prevUrl")) {
        location.href = decodeURIComponent(getCookie("prevUrl"));
      } else {
        location.href = routes.home;
      }
    })
    .catch(function(error) {
      toastr.error("이메일 또는 비밀번호를 확인해 주세요.");
    });
}

function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}

function init() {
  loginBtn.addEventListener("click", () => {
    if (!loginFormCheck()) {
      return false;
    } else {
      loginSubmit();
    }
  });

  password.onkeydown = e => {
    if (e.keyCode === 13) {
      if (!loginFormCheck()) {
        return false;
      } else {
        loginSubmit();
      }
    }
  };

  email.onkeydown = e => {
    if (e.keyCode === 13) {
      if (!loginFormCheck()) {
        return false;
      } else {
        loginSubmit();
      }
    }
  };
}

if (jsLoginFormContainer) {
  init();
}
