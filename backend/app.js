const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const env = require('./environment');



const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


app.use(cors());

const server = http.createServer(app);

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
/** -- Set limit and the size of the request in application/x-www-form-urlencoded -- */
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json());


const createError = require('http-errors');

/** -- Configuration for Static Files -- */
app.use(express.static(`${__dirname}/public`));


mongoose.connect(env.mongoUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Default is 30000
    socketTimeoutMS: 45000, // Default is 45000  
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo database')
});

mongoose.connection.on('error', err => { console.log('Error at mongoDB:' + err) });

app.get('/',async(req,res)=>{

  res.send("welocome to the audio transcript")

})

app.use('/api', require('./api'));
const PORT = 4001;




server.listen(PORT, error => {
    if (error) {
      console.log('Error On Listening at ' + PORT + ' :: ERROR :: ' + error);
    } else {
      console.log('Server Running At ' + PORT);
    }
});










