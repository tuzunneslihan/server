const express = require('express')
const app = express()
const port = 3000
const { Wit, log } = require('node-wit');
// app.use(express.bodyParser());
app.use(express.json());
//TODO: Replace accessToken
const client = new Wit({
    accessToken: '6ZFOTGC2RVR37S6VL44K5VGMUTLOTQEY',
    logger: new log.Logger(log.DEBUG) // optional
});

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/', async function (req, res, next) {
    console.log(req.body)
    processIntent(req.body.message).then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(400).send(err)
    })
});

function processIntent(message) {
    return new Promise(function (resolve, reject) {
        client.message(message, {})
            .then((data) => {
                message="I don't understand you"
                if(data.traits.wit$greetings){
                    message='Hi there!'
                }
                resolve({message:message})
            })
            .catch(console.error);
    })
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))