import { CommandQueue } from '../command-queue';
import { changeTo } from './object';

describe('changeTo', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.enqueue(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point).toEqual({ x: 15, y: 25, z: 35 });
  });

  it("won't tween string values", () => {
    const point = { x: 10, y: 20, z: 30, myString: 'Hello' };
    const target = { x: 20, y: 30, z: 40, myString: 'World' };
    const queue = new CommandQueue();
    queue.enqueue(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point.myString).toEqual('Hello');
  });

  it('only tweens values already on the object', () => {
    const point = { x: 10, y: 20 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.enqueue(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point).toEqual({ x: 15, y: 25 });
  });

  it('only tweens values in the target', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30 };
    const queue = new CommandQueue();
    queue.enqueue(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point).toEqual({ x: 15, y: 25, z: 30 });
  });

  it('tweens values on subobjects', () => {
    const point = { x: 10, subObj: { y: 20, z: 30 } };
    const target = { x: 20, subObj: { y: 30, z: 40 } };

    const queue = new CommandQueue();
    queue.enqueue(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point).toEqual({ x: 15, subObj: { y: 25, z: 35 } });
  });

  it('tweens throws an error when target has a reference loop', () => {
    interface Node {
      node?: Node;
    }
    const point: Node = { node: {} };
    const target: Node = { node: {} };
    target.node = target; // Create a reference loop

    expect(() => changeTo(point, target, 3.0)).toThrowError();
  });
});
