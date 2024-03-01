const path = require("path");

function getPost(req, res) {
  res.render("posts", {
    templateName: "post",
  });

  //res.sendFile(path.join(__dirname, "..", "public", "images", "dog.jpeg"));
}
module.exports = {
  getPost,
};
