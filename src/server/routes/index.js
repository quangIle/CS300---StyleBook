const userRoute = require("./user")
const authenticationRoute = require("./authentication")
const itemRoute = require("./item")
const postRoute = require("./post")

module.exports = (app) => {
  app.use("/authentication", authenticationRoute)
  app.use("/user", userRoute)
  app.use("/item", itemRoute)
  app.use("/post", postRoute)
}
