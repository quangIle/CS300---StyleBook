const express = require("express")
const { route } = require("express/lib/application")
const port = 8000

const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("img"))

const routes = require("./routes")
routes(app)

app.listen(port)
