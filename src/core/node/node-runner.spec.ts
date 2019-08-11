import { NodeRunner } from './node-runner';
import { waitForTime } from '../commands';

describe('NodeRunner', () => {
  it('will call command after delay', done => {
    const runner = new NodeRunner(1000);
    runner.scheduler.add(waitForTime(0.1), () => done());
  });
});
