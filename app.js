// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo') //載入 todo model
const app = express()

//設定連線到 mongoDB，在連線資料庫的同時傳入設定，可以直接把兩組設定合併成一個物件，更新語法
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//取得資料連線狀態
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


//設定首頁路由
//設定Todo頁頁
app.get('/', (req, res) => {
  Todo.find() //取出 todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件，轉換成乾淨單純的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給前端 index 樣版
    .catch(error => console.error(error)) //發生意外，執行錯誤處理

})

//設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})