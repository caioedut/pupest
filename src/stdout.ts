/* eslint-disable */

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

const stdout = {
  info(text: string, label: string = 'INFO', eol: string = `\n`) {
    process.stdout.write(`${styles.bgBlue} ${label.padEnd(7, ' ')} ${styles.reset} ${text}${eol}`);
  },
  warn(text: string, label: string = 'WARN', eol: string = `\n`) {
    process.stdout.write(`${styles.bgYellow} ${label.padEnd(7, ' ')} ${styles.reset} ${text}${eol}`);
  },
  success(text: string, label: string = 'SUCCESS', eol: string = `\n`) {
    process.stdout.write(`${styles.bgGreen} ${label.padEnd(7, ' ')} ${styles.reset} ${text}${eol}`);
  },
  error(text: string, label: string = 'ERROR', eol: string = `\n`) {
    process.stdout.write(`${styles.bgRed} ${label.padEnd(7, ' ')} ${styles.reset} ${text}${eol}`);
  },

  clipText(text: string) {
    const size = process.stdout.columns - 10;
    return text.length > size ? text.substring(0, size - 3).trim() + '...' : text;
  },
};

/* eslint-enable */

export default stdout;
