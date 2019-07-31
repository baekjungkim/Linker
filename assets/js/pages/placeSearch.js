import axios from "axios";

const jsMapContainer = document.getElementById("jsMapContainer");
const keyword = document.getElementById("keyword");

let mapContainer;
let mapOption;
let map;
let clusterer;
let ps;

function mapSearch() {
  // 지도를 표시할 div
  mapContainer = document.getElementById("map");
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 8 // 지도의 확대 레벨
  };

  // 지도를 생성합니다
  map = new kakao.maps.Map(mapContainer, mapOption);

  clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    //averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 4, // 클러스터 할 최소 지도 레벨
    disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
  });

  // 장소 검색 객체를 생성합니다
  ps = new kakao.maps.services.Places();
  ps.keywordSearch(keyword.value || "", placesSearchCB);
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  axios({
    method: "post",
    url: "/place/search",
    responseType: "json"
    // data
  })
    .then(function(response) {
      const places = response.data.places;
      var markers = $(places).map(function(i, position) {
        return new kakao.maps.Marker({
          position: new kakao.maps.LatLng(position.lat, position.lng)
        });
      });

      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers);
    })
    .catch(function(error) {});

  kakao.maps.event.addListener(clusterer, "clusterclick", function(cluster) {
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    var level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  });

  if (status === kakao.maps.services.Status.OK) {
    var coords = new kakao.maps.LatLng(data[0].y, data[0].x);

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);
  }
}

function init() {
  mapSearch();

  // keyword.onkeydown = e => {
  //   if (e.keyCode === 13) {
  //     mapSearch();
  //   }
  // };
}

if (jsMapContainer) {
  init();
}
