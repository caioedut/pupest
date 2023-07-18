import yargs from 'yargs';

const args = yargs(process.argv)
  .options({
    bail: { type: 'boolean' },
    height: { alias: 'h', default: 1080, type: 'number' },
    speed: { type: 'string' },
    timeout: { default: 15000, type: 'number' },
    verbose: { type: 'boolean' },
    visible: { type: 'boolean' },
    width: { alias: 'w', default: 1920, type: 'number' },
  })
  .parse();

export default args as any;
