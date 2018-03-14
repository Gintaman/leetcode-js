class TrieNode {
    constructor(val) {
        this.children = {};         //hashmap of children
        this.val = val;
        this.endOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode("*");
    }
}

let insert = function(word, t) {
    let current = t.root;
    for(let i = 0; i < word.length; i++) {
        if(!(word[i] in current.children)) {
            let c = new TrieNode(word[i]);
            current.children[word[i]] = c;
        }
        current = current.children[word[i]];
    }
    current.endOfWord = true;
};

let search = function(word, t) {
    let current = t.root;
    for(let i = 0; i < word.length; i++) {
        if(!(word[i] in current.children)) {
            return false;
        }
        current = current.children[word[i]];
    }
    return true;
}

let t = new Trie;

insert("test", t);
insert("testy", t);
insert("abcd", t);
insert("abcefgh", t);
console.log(search("testi", t));
console.log(search("abce", t));

