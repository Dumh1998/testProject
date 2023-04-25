const express  = require('express')
const mysql = require('mysql')
const router = express.Router()
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'123456789',
  database:'my_db_01',
})
//查看数据
router.get('/getdata',(req,res) => {
  const sqlStr = 'select * from users'
  db.query(sqlStr,(err,result) => {
    if(err) return err.message
    if(result){
        res.send(result)
    }
})
})
//搜索数据
router.get('/selectdata',(req,res) => {
  const sqlStr = `select * from users where username like '%${req.query.keyname}%' `
  db.query(sqlStr,(err,result) => {
    if(err) return err.message
    if(result){
        res.send(result)
    }
})
})
//增加数据
router.post('/adddata',(req,res) => {
  const msg = {username:req.query.username,password:req.query.password}
  const sqlStr = 'insert into users set ?'
  db.query(sqlStr,msg,(err,result) => {
    if(err) return err.message
    if(result.affectedRows === 1) {console.log('添加数据成功！')}   
})
})
//修改数据
router.post('/editdata',(req,res) => {
  const msg = {username:req.query.username,password:req.query.password}
  const sqlStr = 'update users set ? where id=?'
  db.query(sqlStr,[msg,req.query.id],(err,result) => {
    if(err) return err.message
    if(result.affectedRows === 1) {console.log('修改数据成功！')}   
})
})
//删除数据
router.post('/deldata',(req,res) => {
  const sqlStr = `delete from users where id=${req.query.id}`
  db.query(sqlStr,(err,result) => {
    if(err) return err.message
    if(result.affectedRows === 1) {console.log('删除数据成功！')}   
})
})

module.exports = router