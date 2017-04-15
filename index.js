const env = process.env.NODE_ENV || 'dev';
const express= require ('express')
const app = express()
const mysql = require('mysql')
const database = require ('./config/database.json')[env]
const connection = mysql.createConnection({
    host    : database.host,
    user    : database.username,
    password: database.password,
    database: database.database
}),
    bodyparser= require('body-parser')
connection.connect()


const Home = require('./routes/home'),
    home = new Home()
    Buku = require('./routes/buku'),
    buku = new Buku(connection)

app.set('view engine', 'pug')
app.set('views', './views')
app.use('/bower', express.static('./bower_components'))
app.use(bodyparser.urlencoded({
    extended : true
}))

app.get("/", home.index)
app.get("/buku", buku.index)
app.get("/buku/tambah",buku.tambah)
app.post("/buku/tambah", buku.saveTambah)
app.get("/buku/:id/edit", buku.edit)
app.post("/buku/:id/edit", buku.saveEdit)
app.get("/buku/:id/delete", buku.delete)
app.get("/buku/cari", buku.cari)

app.use((req, res)=> {
    res.status(404)
    res.render('notfound')

})

app.get("/", (req, res)=>{
    res.render('home')
})

app.listen(3000,()=>console.log("aplikasi berjalan di port 3000"))
