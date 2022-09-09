const Todo = require('../todo') //載入todo model
const db = require('../../config/mongoose') //載入 Mongoose連線設定

// 取得資料連線狀態_連線異常_連線成功 顯示訊息
// 使用「陣列迭代方式」把種子資料塞進資料庫，建立新資料庫

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})