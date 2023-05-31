const express = require('express')
const app = express()
const fs = require('fs')
const bp = require('body-parser')
const {translate} = require('free-translate')
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/form.html`)
})
app.post('/post', (req, res) => {
    fs.writeFileSync(`${__dirname}/gpt.txt`, req.body.data)
    fs.readFile(`${__dirname}/gpt_f.txt`, 'utf8', (err, data) => {

        res.send(data)
    })


})

app.listen('3334', () => {
    console.log('i am working')
})