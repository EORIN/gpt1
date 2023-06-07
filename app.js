import express from 'express'
import bodyParser from "body-parser";
import {Configuration, OpenAIApi} from "openai";
import translate from "translate";

import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended: true}))

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration)

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/form.html`)
})
app.get('/t', async (req, res) => {
    let t = await translate('Hello', 'ru')
    res.send(t)
})
app.post('/gpt', async (req, res) => {
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: 'Как ',
    // })
    const englishReq = await translate(req.body.data, 'en')
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: englishReq,
            max_tokens: 200,
        })
        // console.log(response.data.choices[0])
        const russianRes = await translate(response.data.choices[0].text, 'ru')
        console.log(response.data.choices[0])
        return res.send(russianRes)
    } catch (err) {
        console.log(err.content, 'err')
    }

})

app.listen('3334', () => {
    console.log('i am working')
})