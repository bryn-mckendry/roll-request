require('dotenv').config();

const express = require('express');
const apiRouter = require('./routes/rollSet');
const connect = require('./config/mongoose');
const cors = require('cors');

console.log('App Configuration: ' + process.env.NODE_ENV);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', apiRouter);

connect();

app.listen(
    process.env.SERVER_PORT,
    () => { console.log(`Server running on port ${process.env.SERVER_PORT}`); }
);
