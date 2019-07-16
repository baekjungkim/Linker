import axios from "axios";
const placeAddContainer = document.getElementById("jsPlaceAddContainer");
const placeAddBtn = document.getElementById("placeAddBtn");
const addrKeyword = document.getElementsByName("addrKeyword");
const addrPopupBtn = document.getElementById("addrPopupBtn");

let myDropzone = "";

function addrSearch() {
  daum.postcode.load(() => {
    new daum.Postcode({
      oncomplete: data => {
        const roadAddr = data.roadAddress; // 최종 주소 변수
        const jibunAddr = data.jibunAddress;
        const postCode = data.postcode;
        const zoneCode = data.zonecode;
        const roadAddrEng = data.roadAddressEnglish;
        const jibunAddrEng = data.jibunAddressEnglish;

        // 주소 정보를 해당 필드에 넣는다.
        document.getElementById("roadAddr").value = roadAddr;
        document.getElementById("roadAddrEng").value = roadAddrEng;
        document.getElementById("jibunAddr").value = jibunAddr;
        document.getElementById("jibunAddrEng").value = jibunAddrEng;
        document.getElementById("postCode").value = postCode;
        document.getElementById("zoneCode").value = zoneCode;

        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
        };
        //지도를 미리 생성
        const map = new daum.maps.Map(mapContainer, mapOption);
        //주소-좌표 변환 객체를 생성
        const geocoder = new daum.maps.services.Geocoder();
        //마커를 미리 생성
        const marker = new daum.maps.Marker({
          position: new daum.maps.LatLng(37.537187, 127.005476),
          map: map
        });

        // 주소로 상세 정보를 검색
        geocoder.addressSearch(roadAddr, (results, status) => {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            var result = results[0]; //첫번째 결과의 값을 활용

            const lat = result.x;
            const lng = result.y;

            document.getElementById("lat").value = lat;
            document.getElementById("lng").value = lng;

            // 해당 주소에 대한 좌표를 받아서
            var coords = new daum.maps.LatLng(lng, lat);
            // 지도를 보여준다.
            mapContainer.style.display = "block";
            map.relayout();
            // 지도 중심을 변경한다.
            map.setCenter(coords);
            // 마커를 결과값으로 받은 위치로 옮긴다.
            marker.setPosition(coords);
          }
        });
      }
    }).open();
  });
}

function formSubmit() {
  myDropzone.processQueue();
  myDropzone.on("completemultiple", () => {
    var data = $("#placeAddForm, #placeAddrForm").serialize();

    axios({
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      method: "post",
      url: "/place/add",
      responseType: "json",
      data
    })
      .then(function(response) {
        console.log(response.data.message);
      })
      .catch(function(error) {});
  });
}

function init() {
  myDropzone = new Dropzone("form#placeFileForm", {
    url: "/place/file-upload",
    method: "post",
    paramName: () => {
      return "placeFile[]";
    }
  });

  placeAddBtn.addEventListener("click", () => {
    formSubmit();
  });

  addrPopupBtn.addEventListener("click", () => {
    addrSearch();
  });

  addrKeyword[0].addEventListener("click", function(e) {
    addrSearch();
  });

  addrKeyword[1].addEventListener("click", function(e) {
    addrSearch();
  });
}

if (placeAddContainer) {
  init();
}
