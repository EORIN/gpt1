const express = require('express')
const app = express()
cosnt fs = require('fs')

app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/form.html`)
})

app.post('/post', (req, res)=>{
    res.send('OK!')
})

app.listen('3333', ()=>{
    console.log('i am working')
})