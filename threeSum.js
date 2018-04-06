let threeSum = function(nums) {
    nums = nums.sort((a, b) => a - b);
    let map = {};
    let target = 0;
    let solutions = [];
    for(let i = 0; i < nums.length - 2; i++) {
        let partialTarget = target - nums[i];
        let j = i + 1;
        let k = nums.length - 1;
        while(j < k) {
            let partialSum = nums[j] + nums[k];
            if(partialSum === partialTarget) {
                solutions.push([nums[i], nums[j], nums[k]]);
                break;
            }
            else if(partialSum > partialTarget) {
                k--;
            }
            else {
                j++;
            }
        }
    }
    return solutions;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
