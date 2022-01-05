const express = require("express")
const postController = require("../controller/post")

const postRoute = express.Router()
postRoute.get("", postController.getPosts)

module.exports = postRoute
