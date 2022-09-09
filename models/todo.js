const mongoose = require('mongoose')

// 定義資料結構 Schema（資料庫綱要）
// 用 JSON 的方式來告訴 mongo 說 document 的資料會包含哪些型態
// findById() 找的是 _id，不是.id，_id 屬性不需要在 Schema 裡指定，Mongoose 會自動產生
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, //資料型別是字串
    required: true //這是個必填欄位
  },
  isDone: {
    type: Boolean,
    default: false // 預設完成狀態為 False
  }
})
//匯出 Todo資料結構 Schema（資料庫綱要）
module.exports = mongoose.model('Todo', todoSchema)