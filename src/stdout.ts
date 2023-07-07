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
  info(text: string, label: string = 'INFO') {
    process.stdout.write(`${styles.bgBlue} ${label.padEnd(7, ' ')} ${styles.bgGray} ${text} ${styles.reset}\n`);
  },
  warn(text: string, label: string = 'WARN') {
    process.stdout.write(`${styles.bgYellow} ${label.padEnd(7, ' ')} ${styles.bgGray} ${text} ${styles.reset}\n`);
  },
  success(text: string, label: string = 'SUCCESS') {
    process.stdout.write(`${styles.bgGreen} ${label.padEnd(7, ' ')} ${styles.bgGray} ${text} ${styles.reset}\n`);
  },
  error(text: string, label: string = 'ERROR') {
    process.stdout.write(`${styles.bgRed} ${label.padEnd(7, ' ')} ${styles.bgGray} ${text} ${styles.reset}\n`);
  },
};

export default stdout;
