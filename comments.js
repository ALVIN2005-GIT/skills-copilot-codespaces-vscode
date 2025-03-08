// Create web server 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Read data from file
const data = fs.readFileSync('data.json');
const comments = JSON.parse(data);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    const json = JSON.stringify(comments, null, 2);
    fs.writeFile('data.json', json, 'utf8', () => {});
    res.json(comments);
});

// Delete comments
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments.splice(id, 1);
    const json = JSON.stringify(comments, null, 2);
    fs.writeFile('data.json', json, 'utf8', () => {});
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});