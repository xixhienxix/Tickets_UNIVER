const express = require('express')
const bodyParser = require('body-Parser')
const mysql = require('mysql')
var cors = require('cors')
const app = express();
const port = process.env.PORT || 8081

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use(cors())
//MYSQL

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'tickets_univer',

})

app.get('/api/get/campanas',(req,res)=>{

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connectec as id: ', connection.threadId)

            connection.query('SELECT * FROM campanas',(err,rows)=>{
                connection.release()//returns the connection pool

                if(!err){
                    res.send(rows)
                }else{
                    console.log(err)
                }
            })

    })
})


app.listen(port,()=>console.log('Listen on port: ${port}'))
