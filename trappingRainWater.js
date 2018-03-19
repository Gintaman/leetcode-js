//observations:
//- if height[i-1] === height[i+1], index i can trap water of level height[i-1]
//- each index where rain can be trapped relies on elevation to the left and to the right of it to be non zero. this also means we ignore the first and last indices 
//- is there recursion?
//- can we use a stack?
//at each index i, if height[i-1] 

/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

For example,
       0 1 2 3 4 5 6 7 8 9
Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6. 

For i = 5: height[i-1] === height[i] + 1 === height[i+1]

at each index, if the height of the left index is equal to the height of the right index, the current index
can hold water equal to that height
for example: [5, 0, 5] -> can hold 5 units of water.

so at each height[i], if height[i-1] === height[i+1], totalWater += height[i-1].
then we need to look at height[i-1] and height[i+1].
we then need to look at height[i-1] and height[i+1]
if height[i-2] > height [i-1], then we need to check height[i+2]. it those heights are equal, then totalWater can be increased again...

*/
