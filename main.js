const path = require('path');
const root = require('root');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(process.cwd(), 'index.html'));
});

app.get('/asset', (req, res) => {
    const name = req.query.name;
    res.status(200).sendFile(path.resolve(process.cwd(), name));
});

app.listen(port, () => console.log('App running (CTRL + C to stop) \n > localhost:' + port));