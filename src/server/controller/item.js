const { response } = require("express")
const data = require("../data")

module.exports = {
  getList: async (req, res) => {
    try {
      return res.json({
        status: 0,
        message: "Success",
        data: data.itemList,
      })
    } catch (error) {
      return res.json({
        status: 1,
        message: "Error occurred . Please try again",
      })
    }
  },
  getDetail: async (req, res) => {
    try {
      return res.json({
        status: 0,
        message: "Success",
        data: {
          description: "Kiểu dáng fitted, áo polo print họa tiết",
          rating: 10,
          related_items: [
            {
              _id: "0",
              img: `${data.port}item/item_${Math.floor(
                Math.random() * 10
              )}.jpg`,
            },
            {
              _id: "1",
              img: `${data.port}item/item_${Math.floor(
                Math.random() * 10
              )}.jpg`,
            },
          ],
          reviews: [
            {
              _id: "0",
              author: data.users[0],
              content: "Good",
              img: [data.port + "review/review_0.jpg"],
              rating: Math.floor(Math.random() * 10) / 2,
            },
            {
              _id: "1",
              author: data.users[1],
              content: "Look nice",
              img: [data.port + "review/review_1.jpg"],
              rating: Math.floor(Math.random() * 10) / 2,
            },
          ],
          shop: {
            _id: "0",
            avatar: data.port + "shop/shop_0.jpg",
            name: "Under Armour",
            itemCount: Math.floor(Math.random() * 1000),
          },
          stocks: 15,
          tags: ["shirt"],
        },
      })
    } catch (error) {
      return res.json({
        status: 1,
        message: "Error occurred . Please try again",
      })
    }
  },
}
