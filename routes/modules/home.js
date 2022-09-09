//引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//引用 Todo model
const Todo = require('../../models/todo')

//定義首頁路由
router.get('/', (req, res) => {
  Todo.find()                             //取出 todo model 所有資料
    .lean()             // 把 Model 物件，轉換成乾淨單純的 JS 資料陣列
    .sort({ _id: "asc" })           // 根據 _id 升冪(ascending) 排序
    .then(todos => res.render('index', { todos })) // 將 todos 資料，傳給前端 index樣版
    .catch(error => console.error(error)) //如果發生意外，執行錯誤處理
})

//匯出路由模組
module.exports = router