/**
* Элемент списка ответов
*/
class ListItem {
    /**
    * @constructor
    * @param {String} text
    * @param {String} reqText
    */
    constructor(text, reqText) {
        this._node = document.createElement('li');
        this._node.className = 'app__list-item';
        this._node.innerHTML = this._replaceStr(text, reqText);
    }
    /**
    * Вовращает построенный node элемент
    * @return {Node}
    */
    getNode() {
        return this._node;
    }
    /**
    * Выделяет участок s строки src
    * как "важный"
    * @param {*} src
    * @param {*} s
    * @return {String}
    */
    _replaceStr(src, s) {
        const i = src.toLowerCase().indexOf(s);
        if (s.length && i >= 0 && i + s.length <= src.length) {
            return src.slice(0, i) +
                '<b class="app__list-item_type_strong">' +
                src.slice(i, i + s.length) +
                '</b>' + src.slice(i + s.length, src.length);
        } else {
            return src;
        }
    }
}

export default ListItem;
