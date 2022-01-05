const express = require("express")
const userController = require("../controller/user")

const userRoute = express.Router()
userRoute.post("/update", userController.update)

module.exports = userRoute
