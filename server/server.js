const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../public');
const port = 8080;

app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, '/index.html'));
});

app.listen(port);