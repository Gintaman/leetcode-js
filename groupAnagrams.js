//THINK MORE CAREFULLY ABOUT THE PROBLEM FIRST. this is a solid case of bias towards a specific solution.
//we just started coding up something and forming a bias towards that solution without more careful
//thinking of the problem first. the correct solution here is to just sort all the strings and store
//the sorted strings in a separate array. there's no need for these checking anagram shenanigans if
//the strings are all sorted.

//especially when working with problems involving anagrams, consider whether or not sorting all the anagrams first
//would be a faster solution

//WRONG!!!
/*
let isAnagram = function(first, second) {
    if(first.length !== second.length) return false;
    let firstMap = {}, secondMap = {};
    for(let i = 0; i < first.length; i++) {
        if(!(first[i] in firstMap)) 
            firstMap[first[i]] = 1;
        else 
            firstMap[first[i]]++;
        if(!(second[i] in secondMap)) 
            secondMap[second[i]] = 1;
        else 
            secondMap[second[i]]++;
    }
    for(let key in firstMap) {
        if(!(key in secondMap)) return false;
        if(firstMap[key] !== secondMap[key]) return false;
    }
    return true;
};

let groupAnagrams = function(strs) {
    let groups = {};
    for(let i = 0; i < strs.length; i++) {
        if(Object.keys(groups).length === 0) {
            let newGroup = [];
            newGroup.push(strs[i]);
            groups[strs[i]] = newGroup;
        }
        else {
            let found = false;
            for(let key in groups) {
                if(isAnagram(key, strs[i])) {
                    groups[key].unshift(strs[i]);
                    found = true;
                    break;
                }
            }
            if(!found) {
                groups[strs[i]] = [strs[i]];
            }
        }
    }
    let result = [];
    for(let key in groups) {
        groups[key] = groups[key].sort((a, b) => { return a > b });
        result.push(groups[key]);
    }
    result = result.sort((a, b) => { return a.length - b.length });
    return result;
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat", "tab", "ant"]));
//console.log(groupAnagrams(["eat", ""]));
//console.log(groupAnagrams(["", ""]));
*/

let groupAnagrams = function(strs) {
    let map = {};
    for(let i = 0; i < strs.length; i++) {
        let arr = strs[i].split('');
        arr = arr.sort((a, b) => { return a < b; })
        let sorted = arr.join('');
        if(sorted in map) {
            map[sorted].push(i);
        }
        else {
            map[sorted] = [i];
        }
    }
    
    let result = [];
    for(let key in map) {
        let group = [];
        for(let i = 0; i < map[key].length; i++) {
            group.push(strs[map[key][i]]);
        }
        result.push(group);
    }
    return result;
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat", "tab", "ant"]));
console.log(groupAnagrams(["eat", ""]));
console.log(groupAnagrams(["", ""]));
