const express = require("express")
const sqlite3 = require("sqlite3")
const srv = express()
srv.use(require('body-parser').urlencoded({ extended: false }));

srv.use('/', express.static('html'));

srv.post('/cadastro',(req,res)=>{
    let sobrenome = req.body.sobrenome
    let nome = req.body.nome
    let email=  req.body.email
    let descen = req.body.descen


    console.log(req.body.sobrenome);
    let db = new sqlite3.Database('cadastro.db')

    db.serialize(function() {

        let sql = `INSERT INTO cadastro (nome, email, descen_ale) VALUES (?,?,?);`
        db.get(sql,[nome,email,descen],(erro,linha)=>{
            if(erro) throw erro
            
        })
    
        sql = "SELECT sobrenome, region FROM sobrenome WHERE sobrenome = ?; ";
    
        db.get(sql,[sobrenome],(erro,linha)=>{
            if(erro) {throw erro}
            console.log(linha.sobrenome)
    
            res.send(`<!DOCTYPE html>
        <html >
        <h1> Cadastro com succeso <h1>
        <strong>Seu sobrenome vem da parte ${linha.region} da Alemanha</strong>
        </html>`)
        });

    }

    );

    

    
    db.close()
})


srv.listen(3030,()=>{
    console.log('Pronto... pela porta 3030')
})