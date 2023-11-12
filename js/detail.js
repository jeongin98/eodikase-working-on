/* Naver Map 호출*/

// const locations = [
//     { place: "건대입구역", lat: 37.539922, lng: 127.070609 },
//     { place: "어린이대공원역", lat: 37.547263, lng: 127.074181 },
//     { place: "테스트용", lat: 37.547263, lng: 127.078101 },
// ];

// const map = document.getElementById('.map');

function drawMap(locations) {
  var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(locations[0].lat, locations[0].lng), // 배열의 첫 번째 위치를 중심으로 하는 지도
    zoom: 15,
  });

  for (var i = 0; i < locations.length; i++) {
    var marker = new naver.maps.Marker({
      title: locations[i].place,
      position: new naver.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map,
    });
  }
  var polyline = new naver.maps.Polyline({
    path: locations, //선 위치 변수배열
    strokeColor: "#FF0000", //선 색 빨강 #빨강,초록,파랑
    strokeOpacity: 0.8, //선 투명도 0 ~ 1
    strokeWeight: 6, //선 두께
    map: map, //오버레이할 지도
  });
}

function getLocations(courseData) {
  const locations = courseData.courseItems.map((store) => {
    // 새로운 객체를 만들어 필요한 속성만 포함시킴
    return {
      place: store.name,
      lat: store.lat,
      lng: store.lng,
    };
  });
  console.log("locations", locations);

  drawMap(locations);
}

function loadImgBanner(courseData_data) {
  // 첫 번째 store-img 요소를 선택하고 내용을 변경
  var firstStoreImg = document.querySelector(
    ".img-banner .store-img:first-child"
  );
  firstStoreImg.innerHTML += `<img src = ${courseData_data.courseItems[0].imageUrl} >`;
  console.log(
    "courseData_data.courseItems[0].imageUr",
    courseData_data.courseItems[0].imageUr
  );

  // 두 번째 store-img 요소를 선택하고 내용을 변경
  var secondStoreImg = document.querySelector(
    ".img-banner .store-img:nth-child(2)"
  );
  secondStoreImg.innerHTML += `<img src = ${courseData_data.courseItems[1].imageUrl} >`;
  console.log(
    "courseData_data.courseItems[1].imageUr",
    courseData_data.courseItems[1].imageUr
  );

  // 세 번째 store-img 요소를 선택하고 내용을 변경
  var thirdStoreImg = document.querySelector(
    ".img-banner .store-img:nth-child(3)"
  );
  thirdStoreImg.innerHTML += `<img src = ${courseData_data.courseItems[2].imageUrl} >`;
  console.log(
    "courseData_data.courseItems[2].imageUr",
    courseData_data.courseItems[2].imageUr
  );
}

function loadCourseContent(courseData_data) {
  // 유저가 프로필 이미지를 설정해놓지 않을 경우 기본 이미지로 설정
  let profileImage;
  if (courseData_data.memberProfileImage == null) {
    profileImage = "./img/userImg-removebg.svg";
  } else {
    profileImage = content.memberProfileImage;
  }

  const profileImgContainer = document.querySelector(".profile-img");
  const userNicknameContainer = document.querySelector(".user-nickname");
  const courseNameContainer = document.querySelector(".course-name");
  const courseCatergoriesContainer =
    document.querySelector(".course-categories");
  const userNickname = courseData_data.nickname;
  const courseName = courseData_data.courseName;
  const cartegories = getCategories(courseData_data);

  //console.log('course 정보', profileImg, userNickname, courseName, cartegories);

  profileImgContainer.innerHTML = `<img class="card-profile-img" src=${profileImage}>`;
  userNicknameContainer.innerText = userNickname;
  courseNameContainer.innerHTML = `<h2 class="card-title"> ${courseName}</h2 >`;
  courseCatergoriesContainer.innerText = cartegories;
}

// content 배열에서 모든 courseItems의 category 속성을 추출하여 배열 만들기
function getCategories(courseData_data) {
  const categories = courseData_data.courseItems.map((store) => {
    const category = store.category.split(",")[0].trim();
    //console.log('category', category);
    return category;
  });

  console.log("categories", categories);

  return categories; // 매장 정보 담긴 categories 반환
}

function init() {
  /* location.href를 이용해 변경해야할 부분 */
  axios
    .get("https://eodikase.com/v1/courses/course/48")
    //axios.get('https://eodikase.com/v1/course/detail') /* 희범과 해봤는데 불가능한 방식임을 확인하고, STOP */
    .then(function (response) {
      // 성공시 경우 실행
      // console.log('GET Response Data:', response.data.data);
      getLocations(response.data.data);
      loadImgBanner(response.data.data);
      loadCourseContent(response.data.data); // 성공시 피드 화면 만드는 함수 실행
      // var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
    })
    .catch(function (error) {
      // 에러인 경우 실행
      console.log("error");
    });
}

init();
