const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    //console.log(`App running on port ${port}.`)
    console.log(`App running on port ${port}.`);
})