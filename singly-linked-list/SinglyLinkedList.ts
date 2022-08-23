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

  get(index: number) {
    if (index >= this.listLength || index < 0) {
      return undefined;
    } else {
      let node = this.head!;
      for (let i = 0; i < index; i++) {
        node = node.next!;
      }
      return node;
    }
  }

  set(index: number, value: any) {
    const node = this.get(index);
    if (!node) return undefined;

    node.value = value;
    return node;
  }

  insert(index: number, value: any) {
    if (index < 0 || index > this.listLength) return undefined;

    if (index === this.listLength) {
      return this.push(value);
    } else if (index === 0) {
      return this.unshift(value);
    }

    const newNode = new ListNode(value);
    const prevNode = this.get(index - 1)!;
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.listLength++;

    return this;
  }

  remove(index: number) {
    if (index < 0 || index >= this.listLength) return undefined;

    if (index === 0) {
      return this.shift();
    } else if (index === this.listLength - 1) {
      return this.pop();
    }

    const prevNode = this.get(index - 1)!;
    const node = prevNode!.next!;
    prevNode.next = node.next;
    node.next = undefined;
    this.listLength--;
    return node;
  }

  pop(): ListNode | undefined {
    if (this.listLength === 0) return undefined;

    let nodeToRemove: ListNode;
    if (this.listLength === 1) {
      nodeToRemove = this.tail!;
      this.head = undefined;
      this.tail = undefined;
    } else {
      const secondLastNode = this.get(this.listLength - 2);
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

    if (this.listLength === 1) {
      this.tail = nodeToAdd;
    }

    return this;
  }

  reverse() {
    const oldHeadNode = this.head;
    this.head = this.tail;
    this.tail = oldHeadNode;

    let prevNode = undefined;
    let currentNode = oldHeadNode;
    let nextNode;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    return this;
  }

  forEach(callback: (value: any) => void) {
    let currentNode = this.head;
    while (currentNode) {
      callback(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  toArray() {
    const arr: any[] = [];
    this.forEach((val) => arr.push(val));
    return arr;
  }
}
