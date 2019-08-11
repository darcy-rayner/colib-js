import { CommandScheduler } from '../command-scheduler';
import { CommandQueueGroup } from '../command-queue-group';

/** @ignore */
export class NodeRunner {
  public readonly scheduler = new CommandScheduler();
  public readonly queueGroup = new CommandQueueGroup();

  private lastTimestamp: number;
  private immediate: NodeJS.Immediate | undefined;

  public constructor(private maxDeltaTime: number) {
    this.lastTimestamp = Date.now();
    this.immediate = setImmediate(() => this.animationCallback(Date.now()));
  }

  public cancel() {
    if (this.immediate !== undefined) {
      clearImmediate(this.immediate);
      this.immediate = undefined;
    }
  }

  private animationCallback(timestamp: number) {
    const delta = Math.min(timestamp - this.lastTimestamp, this.maxDeltaTime) / 1000;
    this.lastTimestamp = timestamp;
    this.scheduler.update(delta);
    this.queueGroup.update(delta);

    this.immediate = setImmediate(() => this.animationCallback(Date.now()));
  }
}
