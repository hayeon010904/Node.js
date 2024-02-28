// const { send } = require("./lib/request");
// const { read } = require("./lib/response"); // const response = require("./response");
// const { decrypt } = require("./lib/response");
// import { send } from "./request.mjs";
// import { read } from "./response.mjs";
//Index.js사용하는것보다 그냥 임포트하는게 좋음. 불필요한 복잡한 모듈 로딩 시스템
const lib = require("./lib");
function makeRequest(url, data) {
  //요청보내기
  //   request.send(url, data);
  lib.request.send(url, data);
  //데이터 리턴하기(복호환한 데이터)
  return lib.response.read(); //   return response.read();
}

const responseData = makeRequest("https://naver.com", "any data");
// console.log("responseData", responseData);
console.log(require.cache);
