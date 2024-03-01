const path = require("path");
const express = require("express");
const PORT = 4000;

const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start:${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end:${req.method}${req.baseUrl} ${diffTime}ms`);
});

app.get("/", (req, res) => {
  res.render("index", {
    imageTitle: "It is a DogDog",
  });
});
// users경로로 요청보내면, usersRouter로 이동
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
