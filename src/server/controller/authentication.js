const { response } = require("express")
const data = require("../data")
const users = data.users

module.exports = {
  signup: async (req, res) => {
    try {
      let response = null

      users.forEach((user) => {
        if (user.username === req.body.username) {
          response = {
            status: 1,
            message: "Username already exists",
          }
          return
        }
      })

      if (!response) users.push(req.body)

      return res.json(
        response || {
          status: 0,
          message: "Sign up success",
        }
      )
    } catch (error) {
      return res.json({
        status: 1,
        message: "Error occurred . Please try again",
      })
    }
  },
  signin: async (req, res) => {
    try {
      const { username, password } = req.body
      let response = null

      users.forEach((user) => {
        if (user.username === username) {
          if (user.password === password) {
            response = {
              status: 0,
              message: "Sign in success",
              data: user,
            }
            return
          } else {
            response = {
              status: 1,
              message: "Wrong password",
              data: user,
            }
            return
          }
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
}
