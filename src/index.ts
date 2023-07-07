import puppeteer, { Browser, KeyInput, Page } from 'puppeteer';
import go from './commands/go';
import type from './commands/type';
import press from './commands/press';
import contains from './commands/contains';
import wait from './commands/wait';
import stdout from './stdout';
import click from './commands/click';
import find from './commands/find';

const [, , ...args] = process.argv;

export interface PupestOptions {
  visible?: boolean;
  verbose?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
}

export class Pupest {
  private options: PupestOptions = {};

  private queue: Function[] = [];

  private browser?: Browser;

  private page?: Page;

  constructor(options?: PupestOptions) {
    this.options = options || {};

    if (args.includes('--visible')) {
      this.options.visible = true;
    }

    if (args.includes('--verbose')) {
      this.options.verbose = true;
    }

    if (args.includes('--slow')) {
      this.options.speed = 'slow';
    }

    if (args.includes('--medium')) {
      this.options.speed = 'medium';
    }

    if (args.includes('--fast')) {
      this.options.speed = 'fast';
    }
  }

  private enqueue(fn: Function, ...params: any[]) {
    this.queue.push(fn.bind(this, ...params));
    return this;
  }

  go(url: string) {
    return this.enqueue(go, url);
  }

  contains(text: string, selector?: string) {
    return this.enqueue(contains, text, selector);
  }

  press(key: KeyInput) {
    return this.enqueue(press, key);
  }

  type(text: string, selector?: string) {
    return this.enqueue(type, text, selector);
  }

  wait(milliseconds: number) {
    return this.enqueue(wait, milliseconds);
  }

  click(selector: string) {
    return this.enqueue(click, selector);
  }

  find(selector: string, waitTime?: number) {
    return this.enqueue(find, selector, waitTime);
  }

  async test(name: string) {
    const { visible, speed } = this.options;

    this.browser = await puppeteer.launch({
      headless: visible ? false : 'new',
      slowMo: speed === 'slow' ? 100 : speed === 'medium' ? 50 : undefined,
    });

    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(10000);

    stdout.info(name, 'CONTEXT');

    let successCount = 0;
    let error: any = null;

    try {
      for (const fn of this.queue) {
        await fn();
        successCount++;
      }
    } catch (err) {
      error = err;
    }

    if (error) {
      stdout.error(`at command ${successCount + 1}: ${error.command ?? 'unknown'}`, 'FAILED');
      stdout.error(error.message, 'MESSAGE');
    } else {
      stdout.success(`${successCount} command(s)`, 'SUCCESS');
    }

    process.stdout.write(`\n`);

    if (this.browser) {
      this.browser.close().catch(() => null);
    }

    return !error;
  }
}

export const styles = {
  // Defaults
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  // Background
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
  bgGray: '\x1b[100m',
};

export default function pupest(options?: PupestOptions) {
  return new Pupest(options);
}
