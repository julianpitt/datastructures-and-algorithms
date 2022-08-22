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
    it('should add items to the start of the list', () => {
      const list = getTestList();
      expect(list.length()).toBe(5);
      expect(list.first()?.value).toBe('Hi');

      list.unshift('Oh!');
      expect(list.length()).toBe(6);
      expect(list.first()?.value).toBe('Oh!');
      expect(list.first()?.next?.value).toBe('Hi');
    });
  });
});
