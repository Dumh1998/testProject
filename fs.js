const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const router = require('./router')
app.use(router)
app.listen(5177,'127.0.0.1',() => {
    console.log('http://127.0.0.1')
})