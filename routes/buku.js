function Buku (db) {
    const moment = require ('moment')
    moment.locale('id')

    this.index = (req,res)=>{ 
        db.query("SELECT * FROM anggota", (err,results)=>{
            if (err) throw err;
            results.map((r) => r.created_at = moment(r.created_at).format('MMMM Do YYYY, h:mm:ss a'))
            res.render('buku',{
                data : results
            })
                
        })
    }
    this.tambah = (req,res)=>{
        res.render('tambahbuku')
    
    }
    this.saveTambah = (req,res)=>{
        res.json(req.body)
    }
    this.saveTambah= (req,res)=>{
        let data = req.body
        let query = "INSERT INTO anggota (nama, alamat, jenis_kelamin, created_at) VALUES ('" + data.nama + "', '" + data.alamat + "', '" + data.jk + "', NOW())"
        console.log (query)
        db.query(query, (err, results)=>{
            if (err) throw err;
            res.redirect('/buku')
        }) 
    }
    this.edit = (req,res, next)=>{
        db.query ("SELECT * FROM anggota WHERE id_anggota='" + req.params.id + "'",
        (err, results)=>{
            if (err) throw err;
            if (results.length >= 1){
                res.render('tambahbuku', {
                    data: results[0]
                })
            } else {
                next()
            }
        })
    }
    this.saveEdit = (req, res)=>{
        let data = req.body
        db.query("UPDATE anggota SET nama='" + data.nama + "', alamat='" + data.alamat + "', jenis_kelamin= '" + data.jk + "' WHERE id_anggota = '" +
        req.params.id + "'", (err,results)=>{
            if(err)throw err;
            res.redirect("/buku")
        })
    }
    this.delete = (req,res)=>{
        db.query("DELETE FROM anggota WHERE id_anggota='" + req.params.id + "'",
        (err,results)=>{
              if(err)throw err;
            res.redirect("/buku")
        })
    }
    this.cari = (req,res)=>{
        db.query("SELECT * FROM anggota WHERE nama like '%" + req.query.cari + "%'",
        (err,results)=>{
              if(err)throw err;
            res.render("buku", {
                data:results
            })
        })
    }
}
module.exports = exports = Buku