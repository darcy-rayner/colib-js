import { CommandScheduler } from '../command-scheduler';
import { CommandQueueGroup } from '../command-queue-group';

/** @ignore */
export class BrowserRunner {
  public readonly scheduler = new CommandScheduler();
  public readonly queueGroup = new CommandQueueGroup();

  private lastTimestamp: DOMHighResTimeStamp;
  private requestId: number | undefined;

  public constructor(private maxDeltaTime: number) {
    this.lastTimestamp = performance.now();
    this.requestId = window.requestAnimationFrame(t => this.animationCallback(t));
  }

  public cancel() {
    if (this.requestId !== undefined) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }

  private animationCallback(timestamp: DOMHighResTimeStamp) {
    if (this.lastTimestamp > timestamp) {
      this.lastTimestamp = timestamp;
      this.requestId = window.requestAnimationFrame(t => this.animationCallback(t));
      return;
    }
    const delta = Math.min(timestamp - this.lastTimestamp, this.maxDeltaTime) / 1000;
    this.lastTimestamp = timestamp;
    try {
      this.scheduler.update(delta);
      this.queueGroup.update(delta);
    } finally {
      this.requestId = window.requestAnimationFrame(t => this.animationCallback(t));
    }
  }
}
