# Pupest

The easiest test automation using Puppeteer

## Installation

```shell
yarn add pupest
```

OR

```shell
npm install pupest
```

## Usage

Pupest CLI automatically detects all files *.pupest.js

```js title
// login.pupest.js

import pupest from 'pupest';

pupest()
  .go('https://github.com/login')
  .type('user123', '#login_field')
  .type('pass456', '#password')
  .test('Login into GitHub')
```

### CLI

```shell
pupest --visible --verbose
```

## Commands

| Command      | Params                                                    | Description                                                                                                        |
|--------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `click`      | `selector: string`                                        | Clicks the element matching the selector.                                                                          |
| `contains`   | `text: string`, `selector?: string`                       | Checks if the element matching the selector contains the specified text.                                           |
| `file`       | `selector: string`, `...paths: string[]`                  | Attaches one or more files to the element matching the selector.                                                   |
| `find`       | `selector: string`                                        | Returns the first element matching the selector.                                                                   |
| `frame`      | `selector?: string`                                       | Switches to the frame matching the selector (or to the main frame if no selector is provided).                     |
| `go`         | `url: string`                                             | Navigates to the specified URL.                                                                                    |
| `puppeteer`  | `handler({ browser: Browser, page: Page, scope: Frame })` | Executes a custom handler function that receives an object with instances of the browser, page, and current frame. |
| `press`      | `key: KeyInput`                                           | Presses the specified key.                                                                                         |
| `screenshot` | `path?: string`                                           | Captures a screenshot of the current page and saves it to the specified path (or in the test file directory).      |
| `scroll`     | `selector: string`                                        | Scrolls the page until the element matching the selector is visible.                                               |
| `select`     | `selector: string`, `...values: string[]`                 | Selects the specified options on the element matching the selector.                                                |
| `type`       | `text: string`                                            | Types the specified text.                                                                                          |
| `wait`       | `milliseconds: number`                                    | Waits for the specified number of milliseconds before continuing.                                                  |

## Options

### `bail`

**CLI:** `--bail` or `-b`

If set to `true`, stops the test run on the first failure.

---

### `height`

**CLI:** `--height` or `-h`

The height of the browser window in pixels. Defaults to `1080`.

---

### `speed`

**CLI:** `--speed` or `-s`

The speed at which the tests are run. Can be set to `'slow'`, `'medium'`, or `'fast'`. Defaults to `'fast'`.

---

### `timeout`

**CLI:** `--timoeut` or `-t`

The amount of time in milliseconds to wait for a test to complete before timing out. Defaults to `15000`.

---

### `userAgent`

**CLI:** `--userAgent` or `-u`

The user agent string to use when making requests. Defaults to a random user agent.

---

### `verbose`

**CLI:** `--verbose`

If set to `true`, logs more information about the test run.

---

### `visible`

**CLI:** `--visible` or `-v`

If set to `true`, runs the tests in a visible browser window.

---

### `width`

**CLI:** `--width` or `-w`

The width of the browser window in pixels. Defaults to `1920`.
