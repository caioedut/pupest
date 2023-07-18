import yargs from 'yargs';

const args = yargs(process.argv)
  .options({
    bail: { alias: 'b', type: 'boolean' },
    height: { alias: 'h', default: 1080, type: 'number' },
    speed: { alias: 's', type: 'string' },
    timeout: { alias: 't', default: 15000, type: 'number' },
    userAgent: { alias: 'u', type: 'string' },
    verbose: { type: 'boolean' },
    visible: { alias: 'v', type: 'boolean' },
    width: { alias: 'w', default: 1920, type: 'number' },
  })
  .parse();

export default args as any;
