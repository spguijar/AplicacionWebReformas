const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
//modulo para recoger las variables de entorno 
const dotenv = require('dotenv');
dotenv.config();


//Variables
const port = process.env.PORT;


//Variables de las rutas
const serviciosRoute = require('./routes/servicios.route');
const empresaRoute = require('./routes/empresa.route');
const clienteRoute = require('./routes/cliente.route');


app.use(cors())
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



//RUTAS
app.use('/empresa', empresaRoute);
app.use('/servicios', serviciosRoute);
app.use('/cliente', clienteRoute);



app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    //console.log(`App running on port ${port}.`)
    console.log(`App running on port ${port}.`);
})