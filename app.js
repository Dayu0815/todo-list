// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars') //載入 handlebars
const Todo = require('./models/todo') //載入 todo model
const bodyParser = require('body-parser') //引用 body-parser
const app = express()

//設定連線到 mongoDB，在連線資料庫的同時傳入設定，可以直接把兩組設定合併成一個物件，更新語法
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用app.use 規定每一筆請求，都需要先透過 body-parser 前置處理
app.use(bodyParser.urlencoded({ extended: true }))

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

//設定路由 get Todo 首頁
app.get('/', (req, res) => {
  Todo.find() //取出 todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件，轉換成乾淨單純的 JS 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給前端 index 樣版
    .catch(error => console.error(error)) //如果發生意外，執行錯誤處理
})

// 設定路由 get 列出 New 頁面全部資料_ Read  
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 設定路由 post 接住表單資料，送往資料庫新增_ Create
app.post('/todos', (req, res) => {
  const name = req.body.name            //從 req.body 取出表單裡的 name 資料
  return Todo.create({ name })          //存入資料庫，完成 create 動作
    .then(() => res.redirect('/'))      //完成 create 動作後，返回首頁
    .catch(error => console.log(error)) //如果發生意外，執行錯誤處理
})

// 設定路由 get 讀取查詢資料庫，列出某一筆特定資料_ Read
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)               //從資料庫查詢找出資料
    .lean()                              //把資料轉換成，乾淨單純的 JS 物件
    .then((todo) => res.render('detail', { todo })) //把資料送給前端 detail 樣版
    .catch(error => console.log(error))  //如果發生意外，執行錯誤處理
})

// 設定路由 get 讀取查詢資料庫，修改特定資料_ Update
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)               //從資料庫查詢找出資料
    .lean()                              //把資料轉換成，乾淨單純的 JS 物件
    .then((todo) => res.render('edit', { todo })) //把資料送給前端 edit 樣版
    .catch(error => console.log(error))  //如果發生意外，執行錯誤處理
})

// 設定路由 post 讀取查詢資料庫，接住修改後資料，送往資料庫儲存_ Update
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)               //從資料庫查詢找出資料
    .then(todo => {                      //如果查詢成功，把資料修改後，重新儲存資料
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) //如果儲存成功，返回首頁
    .catch(error => console.log(error))  //如果發生意外，執行錯誤處理
})

//設定路由 post 讀取查詢資料庫，刪除特定資料_ Delete
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)                //從資料庫查詢找出資料
    .then(todo => todo.remove())          //如果查詢成功，把資料刪除
    .then(() => res.redirect('/'))        //完成 delete 動作後，返回首頁
    .catch(error => console.log(error))   //如果發生意外，執行錯誤處理
})

//設定監聽 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})