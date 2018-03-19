let hasCycle = function(head) {
    if(!head || !head.next) {
        return head;
    }
    let slow = new ListNode(head.val);
    let fast1 = new ListNode(head.val);
    let fast2 = new ListNode(head.val);

    slow.next = head.next;
    fast1.next = head.next;
    fast2.next = head.next;

    while(slow && (fast2.next) && (fast1.next)) {
        if(slow === fast1 || slow === fast2) {
            return true;
        }
        slow = slow.next;
        fast1 = fast2.next;
        fast2 = fast1.next;
    }
    return false;
};
