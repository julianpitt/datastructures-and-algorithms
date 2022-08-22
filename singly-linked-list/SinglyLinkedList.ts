class ListNode {
  value: any;
  next: ListNode | undefined;

  constructor(value: any, nextNode?: ListNode) {
    this.value = value;
    this.next = nextNode;
  }
}

export class SinglyLinkedList {
  private head?: ListNode;
  private tail?: ListNode;
  private listLength: number;

  constructor() {
    this.listLength = 0;
  }

  first() {
    return this.head;
  }

  last() {
    return this.tail;
  }

  length() {
    return this.listLength;
  }

  push(value: any) {
    const node = new ListNode(value);

    if (this.listLength === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.listLength++;
    return this;
  }

  getNodeAt(index: number) {
    if (index > this.listLength - 1) {
      return undefined;
    } else {
      let node = this.head!;
      for (let i = 0; i < index; i++) {
        node = node.next!;
      }
      return node;
    }
  }

  pop(): ListNode | undefined {
    if (this.listLength === 0) return undefined;

    let nodeToRemove: ListNode;
    if (this.listLength === 1) {
      nodeToRemove = this.tail!;
      this.head = undefined;
      this.tail = undefined;
    } else {
      const secondLastNode = this.getNodeAt(this.listLength - 2);
      secondLastNode!.next = undefined;

      nodeToRemove = this.tail!;
      this.tail = secondLastNode;
    }

    this.listLength--;
    return nodeToRemove;
  }

  shift() {
    if (this.listLength === 0) return undefined;

    const nodeToRemove = this.head!;
    this.head = nodeToRemove.next;
    nodeToRemove.next = undefined;

    this.listLength--;
    if (this.listLength === 0) {
      this.tail = undefined;
    }
    return nodeToRemove;
  }

  unshift(value: any) {
    const nodeToAdd = new ListNode(value);
    nodeToAdd.next = this.head;
    this.head = nodeToAdd;
    this.listLength++;
    return this;
  }
}
