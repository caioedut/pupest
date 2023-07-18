import puppeteer, { Browser, KeyInput, Page } from 'puppeteer';
import yargs from 'yargs';
import go from './commands/go';
import type from './commands/type';
import press from './commands/press';
import contains from './commands/contains';
import select from './commands/select';
import wait from './commands/wait';
import scroll from './commands/scroll';
import stdout from './stdout';
import click from './commands/click';
import find from './commands/find';
import screenshot from './commands/screenshot';
import file from './commands/file';

export interface PupestOptions {
  bail?: boolean;
  height?: number;
  width?: number;
  timeout?: number;
  speed?: 'slow' | 'medium' | 'fast';
  visible?: boolean;
  verbose?: boolean;
}

const args = yargs(process.argv)
  .options({
    bail: { type: 'boolean' },
    height: { type: 'number', alias: 'h', default: 1080 },
    width: { type: 'number', alias: 'w', default: 1920 },
    timeout: { type: 'number', default: 10000 },
    speed: { type: 'string' },
    verbose: { type: 'boolean' },
    visible: { type: 'boolean' },
  })
  .parse() as PupestOptions;

export class Pupest {
  private readonly path: string;

  private readonly options: Required<PupestOptions>;

  private queue: Function[] = [];

  private browser?: Browser;

  private page?: Page;

  constructor(options?: PupestOptions) {
    this.path = process.argv?.[1];

    // @ts-expect-error
    this.options = { ...options, ...args };
  }

  private enqueue(fn: Function, ...params: any[]) {
    this.queue.push(fn.bind(this, ...params));
    return this;
  }

  click(selector: string) {
    return this.enqueue(click, selector);
  }

  contains(text: string, selector?: string) {
    return this.enqueue(contains, text, selector);
  }

  file(selector: string, ...paths: string[]) {
    return this.enqueue(file, selector, ...paths);
  }

  find(selector: string, waitTime?: number) {
    return this.enqueue(find, selector, waitTime);
  }

  go(url: string) {
    return this.enqueue(go, url);
  }

  press(key: KeyInput) {
    return this.enqueue(press, key);
  }

  screenshot(path?: string) {
    return this.enqueue(screenshot, path);
  }

  scroll(selector: string) {
    return this.enqueue(scroll, selector);
  }

  select(selector: string, ...values: string[]) {
    return this.enqueue(select, selector, ...values);
  }

  type(text: string, selector?: string) {
    return this.enqueue(type, text, selector);
  }

  wait(milliseconds: number) {
    return this.enqueue(wait, milliseconds);
  }

  async test(name: string) {
    const options = this.options;

    this.browser = await puppeteer.launch({
      headless: options.visible ? false : 'new',
      slowMo: options.speed === 'slow' ? 100 : options.speed === 'medium' ? 50 : undefined,
      defaultViewport: {
        height: options.height,
        width: options.width,
      },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--single-process',
        '--no-zygote',
        '--no-first-run',
        `--window-size=${options.width},${options.height}`,
        '--window-position=0,0',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-skip-list',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--disable-notifications',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-extensions',
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--disable-smooth-scrolling',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--force-color-profile=srgb',
        '--metrics-recording-only',
        '--mute-audio',
      ],
    });

    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(options.timeout);

    if (options.visible) {
      this.browser.pages().then(([initialPage]) => {
        initialPage.evaluate((name) => (document.title = name), name);
      });
    }

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

    if (error && options.bail) {
      throw new Error('Test failed.');
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
