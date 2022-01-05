const { response } = require("express")
const data = require("../data")
const users = data.users

module.exports = {
  update: async (req, res) => {
    try {
      let response = null

      users.forEach((user, index) => {
        if (user.email === req.body.email) {
          users[index] = { ...user, ...req.body }
          response = {
            status: 0,
            data: users[index],
            message: "Update success",
          }
          return
        }
      })
      return res.json(
        response || {
          status: 1,
          message: "Username does not exist",
          data: 1,
        }
      )
    } catch (error) {
      return res.json({
        status: 1,
        message: "Error occurred . Please try again",
      })
    }
  },
  changeAvatar: async (req, res) => {
    try {
    } catch (error) {
      return res.json({
        status: 1,
        message: "Error occurred . Please try again",
      })
    }
  },
}
