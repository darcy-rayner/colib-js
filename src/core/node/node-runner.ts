import { CommandScheduler } from '../command-scheduler';
import { CommandQueueGroup } from '../command-queue-group';

/** @ignore */
export class NodeRunner {
  public readonly scheduler = new CommandScheduler();
  public readonly queueGroup = new CommandQueueGroup();

  private lastTimestamp: DOMHighResTimeStamp;
  private immediate: NodeJS.Immediate | undefined;

  public constructor(private maxDeltaTime: number) {
    this.lastTimestamp = performance.now();
    this.immediate = setImmediate(() => this.animationCallback(performance.now()));
  }

  public cancel() {
    if (this.immediate !== undefined) {
      clearImmediate(this.immediate);
      this.immediate = undefined;
    }
  }

  private animationCallback(timestamp: DOMHighResTimeStamp) {
    const delta = Math.min(timestamp - this.lastTimestamp, this.maxDeltaTime) / 1000;
    this.lastTimestamp = timestamp;
    this.scheduler.update(delta);
    this.queueGroup.update(delta);

    this.immediate = setImmediate(() => this.animationCallback(performance.now()));
  }
}
