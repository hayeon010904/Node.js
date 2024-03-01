const express = require("express");

const postsRouter = express.Router();
const postController = require("../controllers/posts.controller");

postsRouter.get("/", postController.getPost);

module.exports = postsRouter;
