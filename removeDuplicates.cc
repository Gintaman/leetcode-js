#include <iostream>
#include <vector>

using namespace std;

int removeDuplicates(vector<int>& nums) {
    int i = nums.size() - 1;
    int j = i - 1;
    while(j >= 0) {
        if(nums[i] == nums[j]) {
            nums.erase(nums.begin() + i);
        }
        i--;
        j = i - 1;
    }
    for(auto a : nums) {
        cout << a << endl;
    }
    return nums.size();
}

int main() {
    vector<int> i {1, 1, 2, 3, 3, 4};
    removeDuplicates(i);
    return 0;
}
