let isPalindrome = function(str) {
    str = str.split(' ').join('');
    str = str.toLowerCase();
    let alphaStart = 'a'.charCodeAt(0);
    let alphaEnd = alphaStart + 25;
    let numericStart = '0'.charCodeAt(0);
    let numericEnd = numericStart + 9;
    let start = 0, end = str.length - 1;
    while(start < end) {
        let startCode = str.charCodeAt(start);
        let endCode = str.charCodeAt(end);

        while((startCode < alphaStart || startCode > alphaEnd) && (startCode < numericStart || startCode > numericEnd)) {
            start++;
            startCode = str.charCodeAt(start);
        }

        while((endCode < alphaStart || endCode > alphaEnd) && (endCode < numericStart || endCode > numericEnd)) {
            end--;
            endCode = str.charCodeAt(end);
        }

        if(str[start] !== str[end]) return false;
        start++;
        end--;
    }
    return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));
