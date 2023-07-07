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

