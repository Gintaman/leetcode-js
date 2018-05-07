
function getParent(i) {
    return Math.floor(i/2);
}

function getLeft(i) {
    return 2 * i;
}

function getRight(i) {
    return (2*i) + 1;
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

let maxHeapify = function(arr, i) {
    let left = getLeft(i);
    let right = getRight(i);
    let largest = 0;
    if(left <= arr.length && arr[left] > arr[i])
        largest = left;
    else
        largest = i;
    if(right <= arr.length && arr[right] > arr[largest]) {
        largest = right;
    }
    if(largest !== i) {
        swap(arr, i, largest);
        maxHeapify(arr, largest);
    }
};

let minHeapify = function(arr, i) {
    let left = getLeft(i);
    let right = getRight(i);
    let largest = 0;
    if(left <= arr.length && arr[left] < arr[i])
        largest = left;
    else
        largest = i;
    if(right <= arr.length && arr[right] < arr[largest]) {
        largest = right;
    }
    if(largest !== i) {
        swap(arr, i, largest);
        minHeapify(arr, largest);
    }
}

let buildMaxHeap = function(arr) {
    for(let i = Math.floor(arr.length / 2); i >= 0; i--) {
        maxHeapify(arr, i);
    }
};

let buildMinHeap = function(arr) {
    for(let i = Math.floor(arr.length / 2); i >= 0; i--) {
        minHeapify(arr, i);
    }
};

let heapSort = function(arr, order) {
    order === 'max' ? buildMaxHeap(arr) : buildMinHeap(arr);
    let res = [];
    for(let i = arr.length - 1; i >= 0; i--) {
        swap(arr, 0, i);
        res.push(arr.pop());
        order === 'max' ? maxHeapify(arr, 0) : minHeapify(arr, 0);
    }
    return res;
};

let arr = [15, 21, 63, 65, 18, 75, 36, 82, 90];
console.log(arr);
let sorted = heapSort(arr, 'min');
console.log(sorted);
