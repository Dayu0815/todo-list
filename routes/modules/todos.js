const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// 設定路由 get 列出 New 頁面全部資料_ Read
router.get('/new', (req, res) => {
  return res.render('new')
})

// 設定路由 post 接住表單資料，送往資料庫新增_ Create
router.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定路由 get 讀取查詢資料庫，列出某一筆特定資料_ Read
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// 設定路由 get 讀取查詢資料庫，修改特定資料_ Update
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成put 讀取查詢資料庫，接住修改後資料，送往資料庫儲存_ Update
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成delete 讀取查詢資料庫，刪除特定資料_ Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router