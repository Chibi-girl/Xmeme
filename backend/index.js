let express = require('express')
let cors = require('cors')
var morgan = require('morgan')
let bodyParser = require('body-parser')
let dotenv=require('dotenv')
const db = require('./entries')
const movieRouter = require('./router_controller/router')
let app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
db.once('open',() => console.log('Connected to db'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use('/',movieRouter)
app.get('/', (_, res) => {
    res.send('Hello from the profile backend!')
})
app.all('/memes', (req, res) => {
            res.status(405).send("ERROR:--Method not implemented")
    })
app.all('*', (req, res) => {
            res.status(400).send("ERROR:--Invalid path")
    })
app.listen(8081, () => {
  console.log(`Example app listening at http://localhost:8081...`);
});
