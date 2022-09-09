// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars') //載入 handlebars

const bodyParser = require('body-parser') //請改用內建 body-parser，不需另外安裝載入
const methodOverride = require('method-override') //載入 method-override(路由覆蓋機制)
const routes = require('./routes') //載入 Router路由器
const app = express()

//設定連線到 mongoDB，在連線資料庫的同時傳入設定，可以直接把兩組設定合併成一個物件，更新語法
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// setting 樣板引擎 (template engine)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定每一筆請求，都會透過 body-parser 前置處理，都會透過 methodOverride(路由覆蓋機制) 前置處理
//將 request 導入 Router路由器
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// 取得資料連線狀態_連線異常_連線成功 顯示訊息
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})





//設定監聽 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})