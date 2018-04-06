let {words} = require('./streets.js');

/**
 * Suffix trie's node
 */
class SuffixNode {
    /**
     * @constructor
     */
    constructor() {
        this._links = [];
        this._children = [];
    }

    /**
     * Добавляет новый узел в дерево
     * для суффикса word, также
     * в узел добавлет строку link
     * куда входит суффикс word
     * O(n) - где n длина суффикса.
     * @param {String} word
     * @param {String} link
     */
    add(word, link) {
        if (word) {
            const k = word.charAt(0);

            (this._children[k] || (this._children[k] = new SuffixNode()))
            .add(word.substring(1), link);
        }

        if (this._links.length < 10 && !this._links.includes(link)) {
            this._links.push(link);
        }
    }

    /**
     * Возвращает, при наличии,
     * дочерние узлы
     * O(1)
     * @param {String | Number} key
     * @return {Node}
     */
    hasChild(key) {
        return this._children[key];
    }
}

/**
 * Suffix Trie
 */
class SuffixTrie {
    /**
     * @constructor
     */
    constructor() {
        this._trie = new SuffixNode();
        this._build();
    }

    /**
     * Строит дерево
     * Используется, самый простой "наивный подход"
     * O(n*m*m), где n - кол. встрок в массиве
     * m - длина текущей строки.
     */
    _build() {
        console.log('Построение дерева...');

        for (let i = 0; i < words.length; i++) {
            const word = words[i].toLowerCase();
            for (let j = 0; j < word.length; j++) {
                const suf = word.substring(j);
                this._trie.add(suf, words[i]);
            }
        }
        console.log('Дерево построено. ;)');
    }

    /**
     * Вернет подходящие по запросу варианты.
     * максимум 10 вариантов.
     * O(m), где m длинна исскомой строки s
     * @param {String} s
     * @return {String[]}
     */
    find(s) {
        let curNode = this._trie;

        for (let i = 0; i < s.length; i++) {
            const r = curNode.hasChild(s[i]);

            if (r) {
                curNode = r;
            } else {
                return ['Not found'];
            }
        }

        return curNode._links;
    }
}

module.exports = SuffixTrie;
