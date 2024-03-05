const express = require("express");
const path = require("path");
const { default: mongoose } = require("mongoose");
const exp = require("constants");
const User = require("./models/users.model");

const app = express();
app.use("static/", express.static(path.join(__dirname, "public")));
app.use(express.json());
//form 안에 있는 분석해서 가져오기 위해
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/login", function (req, res, next) {
  res.render("login");
});
app.post("/login", function (req, res, next) {});

app.get("/signup", function (req, res, next) {
  res.render("signup");
});
app.post("/signup", async (req, res, next) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
mongoose
  .connect(
    `mongodb+srv://hayeon010904:1234@cluster0.vpyrftr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
