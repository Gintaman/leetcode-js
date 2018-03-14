let MapSum = function() {
    this.map = {};
};

//we're really looking for all prefixes in an array

//string is the key, val is the value
MapSum.prototype.insert = function(key, val) {
    this.map[key] = val;
};

MapSum.prototype.sum = function(prefix) {
    if(prefix.length === 0) {
        return 0;
    }
    let keys = Object.keys(this.map);
    let sum = 0;
    let match = true;
    for(let i = 0; i < keys.length; i++) {
        if(keys[i].length >= prefix.length) {
            match = true;
            for(let j = 0; j < prefix.length; j++) {
                if(prefix[j] !== keys[i][j]) {
                    match = false;
                    break;
                }
            }
            if(match) {
                sum += this.map[keys[i]];
            }
        }
    }
    return sum;
};

let m = new MapSum;



m.insert("apple", 3);
console.log(m.sum("ap"));
m.insert("ap", 2);
console.log(m.sum("a"));
