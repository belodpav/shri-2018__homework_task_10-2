const SuffixTrie = require('./suffixTrie');
const express = require('express');
const app = express();

const trie = new SuffixTrie();

app.use('/', express.static('./client/dist'));

app.get('/search/?', (req, res) => {
    const reqText = req.query.text;
    const result = trie.find(reqText);

    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.listen(3000, () => {
    console.log('Server is running on 3000 port');
});
