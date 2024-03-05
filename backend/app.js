const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/dbConect');
const {readdirSync} = require('fs');
const path = require('path');

require('dotenv').config()


const PORT = process.env.PORT || 8000

//middlewares
app.use(cors())
app.use(express.json())

//routes
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

//serve static files
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, './frontend-app/build')));

app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, "./frontend-app/index.html"), function(err) {
        res.status(500).send(err);
    })
})

const server = () => {
    dbConnection()
    app.listen(PORT, () => {
        console.log(`Server is listening to ${PORT}`)
    })
}

server()