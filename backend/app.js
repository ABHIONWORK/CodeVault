const express = require('express');
const db = require('./db/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {readdirSync} = require('fs');
require('dotenv').config();

const app = express();

//db connection
db();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require(`./routes/` + route)));

// Health check route for Render
app.get('/', (req, res) => res.send('Backend is running'));
app.get('/health', (req, res) => res.send('OK'));

//server
const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.log('Server Error:', err);
});
