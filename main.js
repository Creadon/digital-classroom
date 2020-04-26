const path = require('path');
const root = require('root');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(process.cwd(), 'index.html'));
});

app.get('/get', (req, res) => {
    const name = req.query.name;
    res.status(200).sendFile(path.resolve(process.cwd(), name));
});

app.get('/boxes', (req, res) => {
    var index = req.query.index;
    const amount = getClasses().length;
    var returned = 0;
    var boxes = '';
    var html = fs.readFileSync('box.html').toString();
    getClasses().forEach((element) => {
        var box = html
            .replace('%name%', element['name'])
            .replace('%identifier%', element['identifier'])
            .replace('%teacher%', element['teacher'])
            .replace('%meets_link%', element['meets_link']);
        if (index <= 0 && returned != 3) {
            boxes += box;
            returned++;
        }
        if (index > 0) index--;
    });
    res.status(200).send(boxes);
});

app.get('/amount', (req, res) => {
    res.status(200).send(getClasses().length.toString());
});

function getClasses() {
    return JSON.parse(fs.readFileSync('classes.json'))['classes'];
}

app.listen(port, () => console.log('App running (CTRL + C to stop) \n > localhost:' + port));
