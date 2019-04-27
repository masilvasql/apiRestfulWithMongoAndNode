const express = require('express')
const rota = express.Router()
var Produto = require('../models/produto')

rota.use((req, res, next) => {
    console.log("DEU BOA")
    next()
})

rota.route('/produtos')
    .post((req, res) => {
        var produto = new Produto();
        produto.nome = req.body.nome
        produto.preco = req.body.preco
        produto.descricao = req.body.descricao

        produto.save((err) => {
            if (err)
                throw res.send(`Erro ao tentar salvar produto ${err}`)
            res.json({ message: "Produto salvo com sucesso" })
        })
    })
    .get((req, res) => {
        Produto.find((err, prod) => {
            if (err)
                res.send(`Erro ao buscar produtos ${err}`)
            res.send(prod)
        })
    })

rota.route("/produtos/produto_id")
    .get((req, res) => {
        Produto.findById(req.body.id, (err, produto) => {
            if (err)
                res.send("Erro: ", err)
            res.send(produto)
        })
    })
    .put((req, res) => {
        Produto.findById(req.body.id, (err, produto) => {
            if (err)
                res.send("Produto não encontrado ", err)
            produto.nome = req.body.nome
            produto.preco = req.body.preco
            produto.descricao = req.body.descricao

            produto.save((err) => {
                if (err)
                    res.send("Falha ao atualizar os dados ", err)
                res.send("Produto salvo com sucesso")
            })
        })
    })
    .delete((req, res) => {
        Produto.deleteOne({
            _id: req.body.id
        }, (err) => {
            if (err)
                res.send("Erro ao deletar item")
            res.send("Produto deletado com sucesso")
        })
    })


rota.get('/', (req, res) => {
    res.json({ message: "Olá, deu boa" })
})



module.exports = app => app.use('/api', rota)