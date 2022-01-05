const { response } = require("express")
const data = require("../data")

module.exports = {
  getPosts: async (req, res) => {
    try {
      const { username } = req.query
      if (username.length > 0) {
        const userPosts = data.posts.filter(
          (post) => post.author.username === username
        )
        return res.json({
          status: 0,
          message: "Success",
          data: userPosts,
        })
      }
      return res.json({
        status: 0,
        message: "Success",
        data: data.posts,
      })
    } catch (error) {
      return res.json({
        status: 1,
        message: "Error occurred . Please try again",
      })
    }
  },
}
