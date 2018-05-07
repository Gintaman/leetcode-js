let p1 = "/a/./b/../../c/"; //-> /c
let p2 = "/home//////foo";

let simplifyPath = function(path) {
    let s = ['/'];
    path = path.split('/');
    let result = '';
    for(let i = 0; i < path.length; i++) {
        if(path[i] === '') {            //skip
        }
        else if(path[i] === '.') {      //skip
        }
        else if(path[i] === '..') {     //pop
            if(s.length > 1) {          //if /../, stay at root
            }
        }
        else {                          //push
        }
    }
};

simplifyPath(p1);
simplifyPath(p2);
