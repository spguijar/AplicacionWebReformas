const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//modulo para recoger las variables de entorno 
const dotenv = require('dotenv');
dotenv.config();


//Variables
const port = process.env.PORT;
const empresaRoute = require('./routes/empresa.route');



app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use('/empresa', empresaRoute);


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    //console.log(`App running on port ${port}.`)
    console.log(`App running on port ${port}.`);
})