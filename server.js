const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(bodyParser.json({limit:'50mb'}))

const port = process.env.PORT || 9000;

require('./app/routes/crud')(app)

app.listen(port, ()=>{
    console.log(`RODANDO NA PORTE ${port}`)
})
