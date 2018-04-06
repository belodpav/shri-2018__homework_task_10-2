const SuffixTrie = require('./suffixTrie');
const path = require('path');
const express = require('express');
const app = express();

const trie = new SuffixTrie();

app.use('/', express.static(path.resolve('.', 'client/dist/')));

app.get('/search/?', (req, res) => {
    const reqText = req.query.text;
    const result = trie.find(reqText);

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.resolve('.', 'client/dist/')});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running ...');
});
