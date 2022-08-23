import { SinglyLinkedList } from './SinglyLinkedList';

function getTestList() {
  const list = new SinglyLinkedList();
  return list.push('Hi').push('my').push('name').push('is').push('Julian');
}

describe('SinglyLinkedList', () => {
  describe('push', () => {
    it('should add items to the end of the list', () => {
      const list = new SinglyLinkedList();
      expect(list.length()).toBe(0);
      expect(list.first()).toBeUndefined();
      expect(list.last()).toBeUndefined();

      list.push('Hi').push('my').push('name').push('is').push('Julian');
      const firstNode = list.first();
      expect(list.length()).toBe(5);
      expect(firstNode?.value).toBe('Hi');
      expect(firstNode?.next?.value).toBe('my');
      expect(firstNode?.next?.next?.value).toBe('name');
      expect(firstNode?.next?.next?.next?.value).toBe('is');
      expect(firstNode?.next?.next?.next?.next?.value).toBe('Julian');
      expect(list.last()?.value).toBe('Julian');
    });
  });

  describe('pop', () => {
    it('should remove items from the end of the list', () => {
      const list = getTestList();
      expect(list.last()?.value).toBe('Julian');

      const name = list.pop();
      expect(list.length()).toBe(4);
      expect(name!.value).toBe('Julian');
      expect(name!.next).toBeUndefined();

      expect(list.last()?.value).toBe('is');
      expect(list.last()!.next).toBeUndefined();
    });
  });

  describe('shift', () => {
    it('should remove items from the start of the list', () => {
      const list = getTestList();
      expect(list.first()?.value).toBe('Hi');

      const greeting = list.shift();
      expect(list.length()).toBe(4);
      expect(greeting!.value).toBe('Hi');
      expect(greeting!.next).toBeUndefined();

      expect(list.first()?.value).toBe('my');
      expect(list.first()!.next?.value).toBe('name');
    });
  });

  describe('unshift', () => {
    it('should add items to the start of the list with previous items', () => {
      const list = getTestList();
      expect(list.length()).toBe(5);
      expect(list.first()?.value).toBe('Hi');

      const listRef = list.unshift('Oh!');
      expect(list.length()).toBe(6);
      expect(list.first()?.value).toBe('Oh!');
      expect(list.first()?.next?.value).toBe('Hi');

      expect(listRef).toBe(list);
    });

    it('should add items to the start of the list with no items', () => {
      const list = new SinglyLinkedList();
      expect(list.length()).toBe(0);
      expect(list.first()).toBeUndefined();
      expect(list.last()).toBeUndefined();

      const listRef = list.unshift('Oh!');
      expect(list.length()).toBe(1);
      expect(list.first()?.value).toBe('Oh!');
      expect(list.first()?.next).toBeUndefined();

      expect(list.last()?.value).toBe('Oh!');
      expect(listRef).toBe(list);

      list.unshift('Hey');
      expect(list.length()).toBe(2);
      expect(list.first()?.value).toBe('Hey');
      expect(list.first()?.next?.value).toBe('Oh!');

      expect(list.last()?.value).toBe('Oh!');
    });
  });

  describe('get', () => {
    it('should return undefined if the index is negative', () => {
      const list = getTestList();
      const node = list.get(-1);
      expect(node).toBeUndefined();
    });

    it('should return undefined if the index is out of bounds', () => {
      const list = getTestList();
      const node = list.get(5);
      expect(node).toBeUndefined();
    });

    it('should return the head node if the index is 0', () => {
      const list = getTestList();
      const node = list.get(0);
      expect(node?.value).toBe('Hi');
      expect(list.first()).toBe(node);
    });

    it('should return the last node if the index is the length -1', () => {
      const list = getTestList();
      const node = list.get(4);
      expect(node?.value).toBe('Julian');
      expect(list.last()).toBe(node);
    });
  });

  describe('set', () => {
    it('should return undefined if the index is negative', () => {
      const list = getTestList();
      const node = list.set(-1, 'hi');
      expect(list.length()).toBe(5);
      expect(node).toBeUndefined();
    });

    it('should return undefined if the index is out of bounds', () => {
      const list = getTestList();
      const node = list.set(5, 'hi');
      expect(list.length()).toBe(5);
      expect(node).toBeUndefined();
    });

    it('should update the head node', () => {
      const list = getTestList();
      expect(list.first()?.value).toBe('Hi');

      const node = list.set(0, 'Hello');
      expect(list.length()).toBe(5);
      expect(list.first()).toBe(node);
      expect(list.first()?.value).toBe('Hello');
    });

    it('should update the last node', () => {
      const list = getTestList();
      expect(list.last()?.value).toBe('Julian');

      const node = list.set(4, 'Matt');
      expect(list.length()).toBe(5);
      expect(list.last()).toBe(node);
      expect(list.last()?.value).toBe('Matt');
    });
  });

  describe('insert', () => {
    it('should return undefined if the index is negative', () => {
      const list = getTestList();
      const node = list.insert(-1, 'hi');
      expect(list.length()).toBe(5);
      expect(node).toBeUndefined();
    });

    it('should return undefined if the index is out of bounds', () => {
      const list = getTestList();
      const node = list.insert(6, 'hi');
      expect(list.length()).toBe(5);
      expect(node).toBeUndefined();
    });

    it('should insert at the head node', () => {
      const list = getTestList();
      expect(list.first()?.value).toBe('Hi');

      const listRef = list.insert(0, 'Hello');
      expect(list.length()).toBe(6);
      expect(list).toBe(listRef);
      expect(list.first()?.value).toBe('Hello');
      expect(list.first()?.next?.value).toBe('Hi');
    });

    it('should insert at the last node', () => {
      const list = getTestList();
      expect(list.last()?.value).toBe('Julian');

      const listRef = list.insert(5, 'Matt');
      expect(list.length()).toBe(6);
      expect(list).toBe(listRef);
      expect(list.last()?.value).toBe('Matt');
    });

    it('should insert in the middle', () => {
      const list = getTestList();

      const listRef = list.insert(2, 'given');
      expect(list).toBe(listRef);
      expect(list.length()).toBe(6);
      expect(list.get(2)?.value).toBe('given');
    });
  });

  describe('remove', () => {
    it('should return undefined if the index is negative', () => {
      const list = getTestList();
      const node = list.remove(-1);
      expect(list.length()).toBe(5);
      expect(node).toBeUndefined();
    });

    it('should return undefined if the index is out of bounds', () => {
      const list = getTestList();
      const node = list.remove(6);
      expect(list.length()).toBe(5);
      expect(node).toBeUndefined();
    });

    it('should remove at the head node', () => {
      const list = getTestList();
      expect(list.first()?.value).toBe('Hi');

      const node = list.remove(0);
      expect(node).not.toBeUndefined();
      expect(node!.next).toBeUndefined();
      expect(node!.value).toBe('Hi');
      expect(list.length()).toBe(4);

      expect(list.first()?.value).not.toBe('Hello');
    });

    it('should remove at the last node', () => {
      const list = getTestList();
      expect(list.last()?.value).toBe('Julian');

      const node = list.remove(4);
      expect(node).not.toBeUndefined();
      expect(node!.next).toBeUndefined();
      expect(node!.value).toBe('Julian');
      expect(list.length()).toBe(4);

      expect(list.last()?.value).not.toBe('Julian');
    });

    it('should remove in the middle', () => {
      const list = getTestList();
      expect(list.get(2)?.value).toBe('name');

      const node = list.remove(2);
      expect(node).not.toBeUndefined();
      expect(node!.next).toBeUndefined();
      expect(node!.value).toBe('name');
      expect(list.length()).toBe(4);
      expect(list.get(2)?.value).not.toBe('name');
    });
  });

  describe('reverse', () => {
    it('should reverse the list', () => {
      const list = getTestList();
      const listRef = list.reverse();
      expect(list).toBe(listRef);

      const firstNode = list.first();
      expect(list.length()).toBe(5);
      expect(firstNode?.value).toBe('Julian');
      expect(firstNode?.next?.value).toBe('is');
      expect(firstNode?.next?.next?.value).toBe('name');
      expect(firstNode?.next?.next?.next?.value).toBe('my');
      expect(firstNode?.next?.next?.next?.next?.value).toBe('Hi');
      expect(list.last()?.value).toBe('Hi');
    });

    it('should reverse a small list', () => {
      const list = new SinglyLinkedList();
      list.push('Hi').push('Julian');
      const listRef = list.reverse();
      expect(list).toBe(listRef);

      const firstNode = list.first();
      expect(list.length()).toBe(2);
      expect(firstNode?.value).toBe('Julian');
      expect(firstNode?.next?.value).toBe('Hi');
      expect(list.last()?.value).toBe('Hi');
    });

    it('should do nothing to a single item list', () => {
      const list = new SinglyLinkedList();
      list.push('Hi');
      const listRef = list.reverse();
      expect(list).toBe(listRef);

      expect(list.length()).toBe(1);
      expect(list.first()?.value).toBe('Hi');
      expect(list.last()?.value).toBe('Hi');
    });

    it('should do nothing to an empty item list', () => {
      const list = new SinglyLinkedList();
      const listRef = list.reverse();
      expect(list).toBe(listRef);

      expect(list.length()).toBe(0);
    });
  });

  describe('forEach', () => {
    it('should perform an action on each item in the list', () => {
      const callback = (val: any) => {
        expect(val).toBeDefined();
      };
      const list = getTestList();
      expect.assertions(list.length());
      list.forEach(callback);
    });

    it('should perform no action on an empty list', () => {
      const callback = (val: any) => {
        expect(val).toBeDefined();
      };
      const list = new SinglyLinkedList();
      expect.assertions(0);
      list.forEach(callback);
    });
  });

  describe('toArray', () => {
    it('should turn the list into an array', () => {
      const list = getTestList();
      const arr = list.toArray();
      expect(arr).toStrictEqual(['Hi', 'my', 'name', 'is', 'Julian']);
    });
  });
});
