function getAddr() {
  // 적용예 (api 호출 전에 검색어 체크)
  if (!checkSearchedWord(document.form.keyword)) {
    return;
  }

  $.ajax({
    url: "http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do", //인터넷망
    type: "post",
    data: $("#form").serialize(),
    dataType: "jsonp",
    crossDomain: true,
    success: function(jsonStr) {
      $("#list").html("");
      var errCode = jsonStr.results.common.errorCode;
      if (errCode != "0") {
        $("#pageApi").html("");
        if (errCode == "E0001") {
          alert("승인되지 않은 KEY입니다.");
        } else if (errCode == "E0005") {
          alert("검색어를 입력해주세요.");
        } else if (errCode == "E0006") {
          alert("시도명으로는 검색이 불가합니다.");
        } else {
          alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
        }
      } else {
        if (jsonStr != null) {
          makeListJson(jsonStr);
          pageMake(jsonStr);
        }
      }
    },
    error: function(xhr, status, error) {
      alert("에러발생");
    }
  });
}

function makeListJson(jsonStr) {
  let roadAddr = "";
  let jibunAddr = "";
  let zipNo = "";
  var htmlStr = "";
  htmlStr += "<table border=1>";
  console.log(jsonStr.results.juso);
  $(jsonStr.results.juso).each(function() {
    zipNo = this.zipNo;
    roadAddr = this.roadAddrPart1 + this.roadAddrPart2;
    jibunAddr = this.jibunAddr;
    htmlStr += "<tr>";
    htmlStr += "<td rowspan=2>" + zipNo + "</td>";
    htmlStr += "<td>" + roadAddr + "</td>";
    htmlStr +=
      '<td rowspan=2><input type="button" onclick="addressing(\'' +
      zipNo +
      "','" +
      roadAddr +
      "','" +
      jibunAddr +
      '\')" value="선택"></td>';
    htmlStr += "</tr>";
    htmlStr += "<tr>";
    htmlStr += "<td>" + jibunAddr + "</td>";
    htmlStr += "</tr>";
  });
  htmlStr += "</table>";
  $("#list").html(htmlStr);
}

// 주소값 넣어주기
function addressing(zipNo, roadAddr, jibunAddr) {
  $(opener.document)
    .find("#keyword")
    .val($("#keyword").val());
  $(opener.document)
    .find("#zipNo")
    .val(zipNo);
  $(opener.document)
    .find("#roadAddr")
    .val(roadAddr);
  $(opener.document)
    .find("#jibunAddr")
    .val(jibunAddr);

  $(opener.location).attr("href", "javascript:addressSearch();");
  window.close();
}

//페이지 이동
function goPage(pageNum) {
  document.form.currentPage.value = pageNum;
  getAddr();
}

// json타입 페이지 처리 (주소정보 리스트 makeListJson(jsonStr); 다음에서 호출)

function pageMake(jsonStr) {
  var total = jsonStr.results.common.totalCount; // 총건수
  var pageNum = document.form.currentPage.value; // 현재페이지
  var paggingStr = "";
  if (total < 1) {
    var htmlStr = "";
    htmlStr += "<table>";
    htmlStr += "<tr>";
    htmlStr += "<td>검색결과가 없습니다.</td>";
    htmlStr += "</tr>";
    htmlStr += "</table>";
    $("#list").html(htmlStr);
    $("#pageApi").html("");
  } else {
    if (total > 1000) {
      total = 1000;
    }
    var PAGEBLOCK = 10; // 10
    var pageSize = 10; // 10
    var totalPages = Math.floor((total - 1) / pageSize) + 1; // 총페이지
    var firstPage = Math.floor((pageNum - 1) / PAGEBLOCK) * PAGEBLOCK + 1; // 리스트의 처음 ( (2-1)/10 ) * 10 + 1 // 1 11 21 31

    if (firstPage <= 0) firstPage = 1; // 처음페이지가 1보다 작으면 무조건 1

    var lastPage = firstPage - 1 + PAGEBLOCK; // 리스트의 마지막 10 20 30 40 50

    if (lastPage > totalPages) lastPage = totalPages; // 마지막페이지가 전체페이지보다 크면 전체페이지

    var nextPage = lastPage + 1; // 11 21
    var prePage = firstPage - PAGEBLOCK;

    if (firstPage > PAGEBLOCK) {
      paggingStr += "<a href='javascript:goPage(" + prePage + ");'>◁</a>  "; // 처음 페이지가 아니면 <를 넣어줌
    }

    for (var i = firstPage; i <= lastPage; i++) {
      if (pageNum == i)
        paggingStr +=
          "<a style='font-weight:bold;color:blue;font-size:15px;' href='javascript:goPage(" +
          i +
          ");'>" +
          i +
          "</a>  ";
      else
        paggingStr += "<a href='javascript:goPage(" + i + ");'>" + i + "</a>  ";
    }

    if (lastPage < totalPages) {
      paggingStr += "<a href='javascript:goPage(" + nextPage + ");'>▷</a>"; // 마지막페이지가 아니면 >를 넣어줌
    }

    $("#pageApi").html(paggingStr);
  }
}

//특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
function checkSearchedWord(obj) {
  if (obj.value.length > 0) {
    //특수문자 제거
    var expText = /[%=><]/;
    if (expText.test(obj.value) == true) {
      alert("특수문자를 입력 할수 없습니다.");
      obj.value = obj.value.split(expText).join("");
      return false;
    }

    //특정문자열(sql예약어의 앞뒤공백포함) 제거
    var sqlArray = new Array(
      //sql 예약어
      "OR",
      "SELECT",
      "INSERT",
      "DELETE",
      "UPDATE",
      "CREATE",
      "DROP",
      "EXEC",
      "UNION",
      "FETCH",
      "DECLARE",
      "TRUNCATE"
    );

    var regex;
    for (var i = 0; i < sqlArray.length; i++) {
      regex = new RegExp(sqlArray[i], "gi");

      if (regex.test(obj.value)) {
        alert(
          '"' + sqlArray[i] + '"와(과) 같은 특정문자로 검색할 수 없습니다.'
        );
        obj.value = obj.value.replace(regex, "");
        return false;
      }
    }
  }
  return true;
}

function enterSearch() {
  var evt_code = window.netscape ? ev.which : event.keyCode;
  if (evt_code == 13) {
    event.keyCode = 0;
    document.form.currentPage.value = 1;
    getAddr(); //jsonp사용시 enter검색
  }
}
