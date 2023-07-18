import yargs from 'yargs';

const args = yargs(process.argv)
  .options({
    bail: { type: 'boolean' },
    height: { type: 'number', alias: 'h', default: 1080 },
    width: { type: 'number', alias: 'w', default: 1920 },
    timeout: { type: 'number', default: 15000 },
    speed: { type: 'string' },
    verbose: { type: 'boolean' },
    visible: { type: 'boolean' },
  })
  .parse();

export default args as any;
