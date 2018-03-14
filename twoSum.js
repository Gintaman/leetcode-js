//store the difference between target and each number in a map
//for nums[0] = 2, we store the difference between 9 and 2 as a key in a map, and its index as the value
//this means our map contains potential complements of 9. then if we find a complement in the next iterations, we've found a sum
//map[2] = 0

//for every element, check if we've seen the complement of the target and that element in the past. if we have,
//then we know the current element and the one we've seen 

//2, 7, 11, 15
//i = 0, nums[0] = 2
//complement of 9 and 2.
//so store 2 as a key, and i as the index
//i = 1, nums[1] = 7
//complement of 9 and 7 is 2. this means if we've seen a 2 in the past, we're done

//basically just store all the numbers we've seen before in a table
//on each element, get the difference between the target and that number. if we have the difference stored in our table somewhere,
//then we know they'll add up to the target
var twoSum = function(nums, target) {
    let map = {};
    for(let i = 0; i < nums.length; i++) {
        if((target - nums[i]) in map) {
            return [map[target - nums[i]], i];
        }
        map[nums[i]] = i;
    }
};

//complements
//[2, 7, 11, 15]
//map.2 = 0
//if(9-7) in map, then return [map[i]]

console.log(twoSum([2, 7, 11, 15], 9));
