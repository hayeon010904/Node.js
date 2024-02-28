// module.exports.A = 1;
// module.exports.encrypt = function encrypt(data) {
//   return "encrypted data";
// };
// exports.encrypt = function encrypt(data) {
//   return "encrypted data";
// };
// //default로
// module.exports = function encrypt(data) {};

function encrypt(data) {
  return "encrypted data";
}
function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData} is being sent to ${url}`);
}
//결국 이 방법이좋음!
module.exports = {
  send,
};
//ECMA 스크립트 모듈
// export { send };
