import { CommandQueue } from '../command-queue';
import { changeTo, changeFrom, changeToOffset, changeFromOffset, scaleBy, scaleFrom } from './object';

describe('changeTo', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.push(changeTo(point, target, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 12.5, y: 22.5, z: 32.5 });
  });

  it("won't tween string values", () => {
    const point = { x: 10, y: 20, z: 30, myString: 'Hello' };
    const target = { x: 20, y: 30, z: 40, myString: 'World' };
    const queue = new CommandQueue();
    queue.push(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point.myString).toEqual('Hello');
  });

  it('only tweens values already on the object', () => {
    const point = { x: 10, y: 20 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.push(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point).toEqual({ x: 15, y: 25 });
  });

  it('only tweens values in the target', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30 };
    const queue = new CommandQueue();
    queue.push(changeTo(point, target, 3.0));
    queue.update(1.5);
    expect(point).toEqual({ x: 15, y: 25, z: 30 });
  });

  it('tweens values on subobjects', () => {
    const point = { x: 10, subObj: { y: 20, z: 30 } };
    const target = { x: 20, subObj: { y: 30, z: 40 } };

    const queue = new CommandQueue();
    queue.push(changeTo(point, target, 3.0));
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

describe('changeFrom', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.push(changeFrom(point, target, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 17.5, y: 27.5, z: 37.5 });
  });
});

describe('changeFrom', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.push(changeFrom(point, target, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 17.5, y: 27.5, z: 37.5 });
  });
});

describe('changeToOffset', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.push(changeToOffset(point, target, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 15, y: 27.5, z: 40 });
  });
});

describe('changeFromOffset', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const target = { x: 20, y: 30, z: 40 };
    const queue = new CommandQueue();
    queue.push(changeFromOffset(point, target, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 25, y: 42.5, z: 60 });
  });
});

describe('scaleBy', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const amount = { x: 2, y: 3, z: 4 };
    const queue = new CommandQueue();
    queue.push(scaleBy(point, amount, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 12.5, y: 30, z: 52.5 });
  });
});

describe('scaleFrom', () => {
  it('tweens several properties simultaneously', () => {
    const point = { x: 10, y: 20, z: 30 };
    const amount = { x: 2, y: 3, z: 4 };
    const queue = new CommandQueue();
    queue.push(scaleFrom(point, amount, 4.0));
    queue.update(1);
    expect(point).toEqual({ x: 17.5, y: 50, z: 97.5 });
  });
});
