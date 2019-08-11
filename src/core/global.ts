import { CommandScheduler } from './command-scheduler';
import { BrowserRunner } from './browser/browser-runner';
import { NodeRunner } from './node';
import { CommandQueueGroup } from './command-queue-group';

const MAX_DELTA_TIME_MS = 1000;

let globalRunner: Runner | undefined;

interface Runner {
  scheduler: CommandScheduler;
  queueGroup: CommandQueueGroup;
  cancel(): void;
}

/**
 * Retrieves the globalScheduler.
 *
 * ```typescript
 * const scheduler = globalScheduler();
 * const queue = scheduler.add(() => {
 *  console.log("Hello");
 * });
 * ```
 *
 * @param maxDeltaTime The most amount of time the global scheduler can update by between frames.
 * In the browser, this is useful to prevent animations fast forwarding when resuming a backgrounded tab.
 * @returns A global, shared `CommandScheduler` for the current environment.
 */
export function globalScheduler(maxDeltaTime = MAX_DELTA_TIME_MS): CommandScheduler {
  return getRunner(maxDeltaTime).scheduler;
}

/**
 * Retrieves the globalQueueGroup.
 *
 * ```typescript
 * const queueGroup = globalQueueGroup();
 * const queue = queueGroup.createQueue();
 * ```
 *
 * @param maxDeltaTime The most amount of time the global scheduler can update by between frames.
 * In the browser, this is useful to prevent animations fast forwarding when resuming a backgrounded tab.
 * @returns A global, shared `CommandQueueGroup` for the current environment.
 */
export function globalQueueGroup(maxDeltaTime = MAX_DELTA_TIME_MS): CommandQueueGroup {
  return getRunner(maxDeltaTime).queueGroup;
}

/**
 * Cancels all commands currently running on the `globalScheduler` and `globalQueueGroup`.
 */
export function cancelGlobalCommands() {
  if (globalRunner !== undefined) {
    globalRunner.cancel();
    globalRunner = undefined;
  }
}

function getRunner(maxDeltaTime = MAX_DELTA_TIME_MS): Runner {
  if (globalRunner === undefined) {
    if (window === undefined) {
      globalRunner = new NodeRunner(maxDeltaTime);
    } else {
      globalRunner = new BrowserRunner(maxDeltaTime);
    }
  }
  return globalRunner;
}
