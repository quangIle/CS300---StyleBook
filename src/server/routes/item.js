const express = require("express")
const itemController = require("../controller/item")

const itemRoute = express.Router()
itemRoute.get("/", itemController.getList)
itemRoute.get("/detail", itemController.getDetail)

module.exports = itemRoute
