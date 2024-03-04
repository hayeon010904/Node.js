const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretText = "superSecret";
const refreshSecretText = "superSuperSecret";
//미들웨어등록 바디로 들어오는거 분석 => req.body.username;이렇게 받을 수 있음
app.use(express.json());
app.use(cookieParser());
const posts = [
  { username: "John", title: "Post1" },
  { username: "Han", title: "Post2" },
];
app.get("/posts", authMiddleware, (req, res) => {
  res.json([posts]);
});

//인증된 사람만 post를 가져갈 수 있게 미들웨어만들기
function authMiddleware(req, res, next) {
  // 보통 토큰은 헤더에 담기고, 그 req.header에서 토큰 가져오는 코드
  const authHeader = req.headers["authorization"];
  // Bearer adsfjaklfasfjkkaafksajlf
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  //톸큰이 있으니, 유효한토큰인지 확인
  jwt.verify(token, secretText, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
// 토큰생성하는 부분
let refreshTokens = [];
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  //sign메소드 사용해서 토큰 만들기 payload + secretText
  const accessToken = jwt.sign(user, secretText, { expiresIn: "30s" });
  const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: "1d" });
  refreshTokens.push(refreshToken);
  //리프레쉬토큰은 쿠키로 만들어줄거.
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken: accessToken });
});
app.get("/refresh", (req, res) => {
  //   req.body;
  console.log("req.cookies", req.cookies);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, refreshSecretText, (err, user) => {
    if (err) return res.statusCode(403);
    const accessToken = jwt.sign({ name: user.name }, secretText, {
      expiresIn: "30s",
    });
    res.json({ accessToken });
  });
});
// process.env.ACCESS_TOKEN_SECRET
// app 실행
app.listen(4000, () => {
  console.log("listening on port 4000");
});
