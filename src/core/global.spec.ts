import { globalScheduler } from './global';
import { waitForTime } from './commands';

describe('globalScheduler', () => {
  it('will schedule a command', done => {
    globalScheduler().add(waitForTime(0.1), () => done());
  });
});
