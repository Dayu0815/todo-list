const express = require('express')
const router = express.Router()
const home = require('./modules/home') //引入 home模組程式碼
const todos = require('./modules/todos') //引入 todos模組程式碼

//將網址結構符合 / 字串的request 導向 home 模組
//將網址結構符合 /todos 字串的request 導向 todos 模組
router.use('/', home) //如果 request路徑是/ ，就執行 modules/home裡的程式碼
router.use('/todos', todos)

//匯出路由器
module.exports = router