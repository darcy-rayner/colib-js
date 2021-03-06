import { CommandQueue } from '../command-queue';
import { mapParallel, mapSequential } from './functional';
import { sequence, waitForTime } from './common';

describe('mapParallel', () => {
  it('executes all generated commands in parallel', () => {
    const items = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
    const queue = new CommandQueue();
    queue.push(
      mapParallel(items, item =>
        sequence(waitForTime(1), () => {
          item.x++;
        })
      )
    );
    queue.update(0.5);
    expect(items).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }]);
    queue.update(0.5);
    expect(items).toEqual([{ x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }]);
  });

  it('skips undefined return values', () => {
    const items = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
    const queue = new CommandQueue();
    queue.push(
      mapParallel(items, (item, index) => {
        if (index % 2 === 0) {
          return undefined;
        }
        return sequence(waitForTime(1), () => {
          item.x++;
        });
      })
    );
    queue.update(0.5);
    expect(items).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }]);
    queue.update(0.5);
    expect(items).toEqual([{ x: 1 }, { x: 3 }, { x: 3 }, { x: 5 }]);
  });
});

describe('mapSequential', () => {
  it('executes all generated commands in sequence', () => {
    const items = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];
    const queue = new CommandQueue();
    queue.push(
      mapSequential(items, item =>
        sequence(waitForTime(1), () => {
          item.x++;
        })
      )
    );
    queue.update(1);
    expect(items).toEqual([{ x: 2 }, { x: 2 }, { x: 3 }, { x: 4 }]);
    queue.update(1);
    expect(items).toEqual([{ x: 2 }, { x: 3 }, { x: 3 }, { x: 4 }]);
    queue.update(2);
    expect(items).toEqual([{ x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }]);
  });
});
