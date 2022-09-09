// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars') //載入 handlebars
const bodyParser = require('body-parser') //請改用內建 body-parser，不需另外安裝載入
const methodOverride = require('method-override') //載入 method-override(路由覆蓋機制)
const routes = require('./routes') //載入 Router路由器
require('./config/mongoose') //載入 Mongoose連線設定
const app = express()



// setting 樣板引擎 (template engine)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定每一筆請求，都會透過 body-parser 前置處理，都會透過 methodOverride(路由覆蓋機制) 前置處理
//將 request 導入 Router路由器
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)







//設定監聽 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})