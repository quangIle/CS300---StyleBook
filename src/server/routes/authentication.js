const express = require("express")
const authenticationController = require("../controller/authentication")

const authenticationRoute = express.Router()
authenticationRoute.post("/signin", authenticationController.signin)
authenticationRoute.post("/signup", authenticationController.signup)

module.exports = authenticationRoute
