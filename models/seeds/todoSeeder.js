const mongoose = require('mongoose') //載入mongoose
const Todo = require('../todo') //載入todo model

//設定連線到 mongoDB，在連線資料庫的同時傳入設定，可以直接把兩組設定合併成一個物件，更新語法
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料連線狀態_連線異常_連線成功 顯示訊息
// 使用「陣列迭代方式」把種子資料塞進資料庫，建立新資料庫
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})