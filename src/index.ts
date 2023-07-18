import puppeteer, { Browser, Frame, KeyInput, Page } from 'puppeteer';
import UserAgent from 'user-agents';

import args from './args';
import click from './commands/click';
import contains from './commands/contains';
import file from './commands/file';
import find from './commands/find';
import frame from './commands/frame';
import go from './commands/go';
import press from './commands/press';
import screenshot from './commands/screenshot';
import scroll from './commands/scroll';
import select from './commands/select';
import type from './commands/type';
import wait from './commands/wait';
import stdout from './stdout';

export interface PupestOptions {
  bail?: boolean;
  height?: number;
  speed?: 'fast' | 'medium' | 'slow';
  timeout?: number;
  userAgent?: string;
  verbose?: boolean;
  visible?: boolean;
  width?: number;
}

export class Pupest {
  private browser?: Browser;

  private readonly options: Required<PupestOptions>;

  private page?: Page;

  private readonly path: string;

  private queue: Function[] = [];

  public scope?: Frame;

  constructor(options?: PupestOptions) {
    this.path = process.argv?.[1];
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

  frame(selector?: null | string) {
    return this.enqueue(frame, selector);
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

  async test(name: string) {
    const options = this.options;

    this.browser = await puppeteer.launch({
      args: [
        '--autoplay-policy=user-gesture-required',
        '--disable-accelerated-2d-canvas',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-extensions-with-background-pages',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess,BlinkGenPropertyTrees,TranslateUI',
        '--disable-gpu',
        '--disable-hang-monitor',
        '--disable-infobars',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-smooth-scrolling',
        '--disable-speech-api',
        '--disable-sync',
        // '--enable-features=NetworkService,NetworkServiceInProcess',
        '--hide-scrollbars',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-skip-list',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--single-process',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
        '--window-position=0,0',
        `--window-size=${options.width},${options.height}`,
      ],
      defaultViewport: {
        height: options.height,
        width: options.width,
      },
      headless: options.visible ? false : 'new',
      slowMo: options.speed === 'slow' ? 100 : options.speed === 'medium' ? 50 : undefined,
    });

    this.page = await this.browser.newPage();

    await this.page.setDefaultTimeout(options.timeout);
    await this.page.setUserAgent(options?.userAgent || new UserAgent().toString());

    this.scope = await this.page.mainFrame();

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
      await this.browser.close().catch(() => null);
    }

    if (error && options.bail) {
      throw new Error('Test failed.');
    }

    return !error;
  }

  type(text: string, selector?: string) {
    return this.enqueue(type, text, selector);
  }

  wait(milliseconds: number) {
    return this.enqueue(wait, milliseconds);
  }
}

export const styles = {
  // Background
  bgBlack: '\x1b[40m',
  bgBlue: '\x1b[44m',
  bgCyan: '\x1b[46m',
  bgGray: '\x1b[100m',
  bgGreen: '\x1b[42m',
  bgMagenta: '\x1b[45m',
  bgRed: '\x1b[41m',

  bgWhite: '\x1b[47m',
  bgYellow: '\x1b[43m',
  blink: '\x1b[5m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  hidden: '\x1b[8m',
  // Defaults
  reset: '\x1b[0m',
  reverse: '\x1b[7m',
  underscore: '\x1b[4m',
};

export default function pupest(options?: PupestOptions) {
  return new Pupest(options);
}
