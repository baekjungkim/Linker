import axios from "axios";
import toastr from "toastr";
import routes from "../../../routes";

const joinFormContainer = document.getElementById("jsJoinFormContainer");
const name = document.getElementById("name");
const email = document.getElementById("email");
const email1 = document.getElementById("email1");
const email2 = document.getElementById("email2");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const tel1 = document.getElementById("tel1");
const tel2 = document.getElementById("tel2");
const tel3 = document.getElementById("tel3");
const phoneNumber = document.getElementById("phoneNumber");
const verifyNumber = document.getElementById("verifyNumber");
const joinBtn = document.getElementById("joinBtn");
const reqVerify = document.getElementById("reqVerify");
const verifyBtn = document.getElementById("verifyBtn");

let smsVerify = false;
let verifyKey = "";
let phone = "";

const chkPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
const chkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const chkNum = /^[0-9]*$/;

function joinFormCheck() {
  const fullEmail = email1.value + "@" + email2.value;
  if (!name.value) {
    toastr.error("이름을 입력해 주세요.");
    name.focus();
    return false;
  } else if (!email1.value) {
    toastr.error("이메일을 입력해 주세요.");
    email1.focus();
    return false;
  } else if (!chkEmail.test(fullEmail)) {
    toastr.error("이메일을 다시 입력해 주세요.");
    email1.value = "";
    email1.focus();
    return false;
  } else if (!password.value) {
    toastr.error("비밀번호를 입력해 주세요.");
    password.focus();
    return false;
  } else if (!chkPassword.test(password.value)) {
    toastr.error(
      "비밀번호는 문자, 숫자, 특수문자를 사용하여 8자리 이상 입력해 주세요."
    );
    password.value = "";
    password2.value = "";
    password.focus();
    return false;
  } else if (!password2.value) {
    toastr.error("비밀번호 확인을 입력해 주세요.");
    password2.focus();
    return false;
  } else if (password.value !== password2.value) {
    toastr.error("비밀번호가 일치하지 않습니다.");
    password.value = "";
    password2.value = "";
    password.focus();
    return false;
  } else if (!tel2.value || !tel3.value) {
    toastr.error("핸드폰번호를 입력해 주세요.");
    tel2.value = "";
    tel3.value = "";
    tel2.focus();
    return false;
  } else if (!chkNum.test(tel2.value) || !chkNum.test(tel3.value)) {
    toastr.error("핸드폰번호는 숫자만 입력해 주세요.");
    tel2.value = "";
    tel3.value = "";
    tel2.focus();
    return false;
  } else if (!smsVerify) {
    toastr.error("핸드폰번호를 인증해 주세요.");
    return false;
  } else {
    email.value = fullEmail;
    return true;
  }
}

function phoneVerification() {
  smsVerify = false;
  if (!tel2.value || !tel3.value) {
    toastr.error("핸드폰번호를 입력해 주세요.");
    tel2.value = "";
    tel3.value = "";
    tel2.focus();
    return false;
  } else if (!chkNum.test(tel2.value) || !chkNum.test(tel3.value)) {
    toastr.error("핸드폰번호는 숫자만 입력해 주세요.");
    tel2.value = "";
    tel3.value = "";
    tel2.focus();
    return false;
  } else {
    phone = tel1.value + tel2.value + tel3.value;
    const data = { phone };
    axios({
      method: "post",
      url: routes.smsRequest,
      responseType: "json",
      data
    })
      .then(function(response) {
        verifyKey = response.data;
        toastr.info("핸드폰 인증번호가 발송되었습니다.");
      })
      .catch(function(error) {
        toastr.error("이미 사용중인 핸드폰번호입니다.");
        return false;
      });
  }
}

function smsVerifyCheck() {
  const inputVerifyNumber = Number(verifyNumber.value);
  if (verifyKey === "") {
    toastr.error("인증번호를 요청해 주세요.");
    verifyNumber.value = "";
    return false;
  } else if (!inputVerifyNumber) {
    toastr.error("인증번호를 입력해 주세요.");
    verifyNumber.focus();
    return false;
  } else if (inputVerifyNumber !== verifyKey) {
    smsVerify = false;
    toastr.error("인증번호가 다르게 입력 되었습니다.");
    verifyNumber.value = "";
    verifyNumber.focus();
    return false;
  } else {
    smsVerify = true;
    phoneNumber.value = phone;
    toastr.success("핸드폰번호가 인증 되었습니다.");
    return true;
  }
}

function joinSubmit() {
  var data = $("#joinForm").serialize();
  axios({
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    method: "post",
    url: routes.join,
    responseType: "json",
    data
  })
    .then(function(response) {
      toastr.success("가입 되었습니다.");
      location.href = routes.home;
    })
    .catch(function(error) {
      toastr.error("이미 가입되어 있습니다.");
    });
}

function init() {
  joinBtn.addEventListener("click", () => {
    if (!joinFormCheck()) {
      return false;
    } else if (!smsVerify) {
      return false;
    } else {
      joinSubmit();
    }
  });

  reqVerify.addEventListener("click", () => {
    phoneVerification();
  });

  verifyBtn.addEventListener("click", () => {
    smsVerifyCheck();
  });
}

if (joinFormContainer) {
  init();
}
