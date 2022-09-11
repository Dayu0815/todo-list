// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars') //載入 handlebars
const bodyParser = require('body-parser') //請改用內建 body-parser，不需另外安裝載入
const methodOverride = require('method-override') //載入 method-override(路由覆蓋機制)
const routes = require('./routes') //載入 Router路由器
require('./config/mongoose') //載入 Mongoose連線設定
const app = express()
const PORT = process.env.PORT || 3000 //如果在 Heroku 環境使用 process.env.PORT，若在本地環境使用3000

// setting 樣板引擎 (template engine)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定每一筆請求，都要透過 body-parser 前置處理，都要透過 methodOverride(路由覆蓋機制) 前置處理
//將 request 導入 Router路由器
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

//start the server listening for requests 設定應用程式監聽專用 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})