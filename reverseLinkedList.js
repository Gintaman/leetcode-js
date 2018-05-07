let ListNode = function(val) {
    this.val = val;
    this.next = null;
};

//'a' -> 'b' -> 'c'
//to:
//'a' <- 'b' <- 'c

let a = new ListNode('a');
let b = new ListNode('b');
let c = new ListNode('c');
a.next = b;
b.next = c;

let reverseList = function(head) {
    if(head === null) {
        return null;
    }
    if(head.next === null) {
        return head;
    }
    let current = head;
    let stack = [];
    while(current) {
        stack.push(current);
        current = current.next;
    }

    current = stack.pop();
    let newHead = current;
    while(current) {
        let next = stack.pop();
        current.next = next;
        current = next;
    }
    return newHead;
};

let reverseListWithoutStack = function(head) {
    if(!head || !head.next) {
        return head;
    }
    let temp = new ListNode();
    temp.next = head;

    let p = temp.next;
    let q = null;

    while(p.next !== null) {
        q = p.next;
        p.next = q.next;
        q.next = temp.next;
        temp.next = q;
    }
    return temp.next;
}

console.log(reverseList(a));
