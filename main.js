const path = require('path');
const root = require('root');
const express = require('express');
const fs = require('fs');
const app = express();
const ip = require('ip');
var host = ip.address();
const port = 5000;

app.get('/', (req, res) => {
	var html = replaceHostname(fs.readFileSync('index.html').toString());
	res.status(200).send(html);
});

app.get('/script', (req, res) => {
	var script = replaceHostname(fs.readFileSync('script.js').toString());
	res.status(200).send(script);
});

app.get('/style', (req, res) => {
	var style = replaceHostname(fs.readFileSync('style.css').toString());
	res.status(200).set('Content-Type', 'text/css').send(style);
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

function replaceHostname(input) {
	while(input.includes('%host%'))
		input = input.replace('%host%', host);
	while(input.includes('%port%'))
		input = input.replace('%port%', port);
	return input;
}

function getClasses() {
	return JSON.parse(fs.readFileSync('classes.json'))['classes'];
}

app.listen(port, () =>
	console.log('App running (CTRL + C to stop) \n > ' + host + ':' + port)
);
