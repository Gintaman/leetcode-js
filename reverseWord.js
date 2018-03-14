var reverseWords = function(str) {
    let arr = [];
    for(let i = str.length - 1; i >= 0; i--) {
        if(str[i] !== ' ') {
            let s = "";
            while(str[i] !== ' ' && i >= 0) {
                s = str[i] + s;
                i--;
            }
            arr.push(s);
        }
    }
    return arr.join(' ');
};

//console.log(reverseWords("the sky is blue"));
reverseWords(' ');
