import Puppeteer, { Browser, Frame, Page } from 'puppeteer';
import UserAgent from 'user-agents';

import args from './args';
import click from './commands/click';
import clickIfExists from './commands/clickIfExists';
import contains from './commands/contains';
import file from './commands/file';
import find from './commands/find';
import frame from './commands/frame';
import go from './commands/go';
import keep from './commands/keep';
import press from './commands/press';
import puppeteer from './commands/puppeteer';
import screenshot from './commands/screenshot';
import scroll from './commands/scroll';
import select from './commands/select';
import type from './commands/type';
import wait from './commands/wait';
import waitAnimationEnd from './commands/waitAnimationEnd';
import waitResponseURL from './commands/waitResponseURL';
import stdout from './stdout';

export interface PupestOptions {
  bail?: boolean;
  height?: number;
  keep?: boolean;
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

  click(...args: Parameters<typeof click>) {
    return this.enqueue(click, ...args);
  }

  clickIfExists(...args: Parameters<typeof clickIfExists>) {
    return this.enqueue(clickIfExists, ...args);
  }

  command(handler: (pupest: Pupest, ...args: any[]) => Pupest, ...args: Parameters<typeof handler>) {
    // Add new command must be sync
    handler.bind(this)(this, ...args);
    return this;
  }

  contains(...args: Parameters<typeof contains>) {
    return this.enqueue(contains, ...args);
  }

  file(...args: Parameters<typeof file>) {
    return this.enqueue(file, ...args);
  }

  find(...args: Parameters<typeof find>) {
    return this.enqueue(find, ...args);
  }

  frame(...args: Parameters<typeof frame>) {
    return this.enqueue(frame, ...args);
  }

  go(...args: Parameters<typeof go>) {
    return this.enqueue(go, ...args);
  }

  keep(...args: Parameters<typeof keep>) {
    return this.enqueue(keep, ...args);
  }

  press(...args: Parameters<typeof press>) {
    return this.enqueue(press, ...args);
  }

  puppeteer(...args: Parameters<typeof puppeteer>) {
    return this.enqueue(puppeteer, ...args);
  }

  screenshot(...args: Parameters<typeof screenshot>) {
    return this.enqueue(screenshot, ...args);
  }

  scroll(...args: Parameters<typeof scroll>) {
    return this.enqueue(scroll, ...args);
  }

  select(...args: Parameters<typeof select>) {
    return this.enqueue(select, ...args);
  }

  async test(name: string) {
    const options = this.options;

    const perfStart = performance.now();

    this.browser = await Puppeteer.launch({
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
        '--disable-translate',
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
        '--start-maximized',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
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

    if (options.verbose) {
      stdout.info(name, 'CONTEXT');
    } else {
      stdout.warn(stdout.clipText(name), 'RUNNING', '');
    }

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

    const perfEnd = performance.now();
    const perfSeconds = ((perfEnd - perfStart) / 1000).toFixed(2);

    if (error) {
      if (options.verbose) {
        stdout.error(`at command ${successCount + 1}: ${error.command ?? 'unknown'}`, 'FAILED');
        stdout.error(error.message, 'MESSAGE');
      } else {
        this.browser.on('disconnected', () => {
          process.stdout.cursorTo(0);
          process.stdout.clearLine(0);
          stdout.error(stdout.clipText(name), 'FAILED');
          stdout.error(error.message, 'MESSAGE');
        });
      }
    } else {
      if (options.verbose) {
        stdout.success(`${successCount} command(s) in ${perfSeconds}s`, 'SUCCESS');
      } else {
        this.browser.on('disconnected', () => {
          process.stdout.cursorTo(0);
          process.stdout.clearLine(0);
          stdout.success(stdout.clipText(name), 'SUCCESS');
        });
      }
    }

    if (this.options.keep) {
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
      stdout.warn(options.verbose ? 'waiting for manual browser close' : stdout.clipText(name), 'KEEP', '');
    }

    this.browser.on('disconnected', () => {
      if (options.verbose) {
        process.stdout.cursorTo(0);
        process.stdout.clearLine(0);
        process.stdout.write(`\n`);
      }

      if (error && options.bail) {
        throw new Error('Test failed.');
      }
    });

    if (this.browser && !this.options.keep) {
      await this.browser.close().catch(() => null);
    }

    return !error;
  }

  type(...args: Parameters<typeof type>) {
    return this.enqueue(type, ...args);
  }

  wait(...args: Parameters<typeof wait>) {
    return this.enqueue(wait, ...args);
  }

  waitAnimationEnd(...args: Parameters<typeof waitAnimationEnd>) {
    return this.enqueue(waitAnimationEnd, ...args);
  }

  waitResponseURL(...args: Parameters<typeof waitResponseURL>) {
    return this.enqueue(waitResponseURL, ...args);
  }
}

export default function pupest(options?: PupestOptions) {
  return new Pupest(options);
}
