const express = require('express')
const rota = express.Router()

rota.get('/',(req,res)=>{
    res.json({message:"Olá, deu boa"})
})

module.exports = app=> app.use('/api', rota)