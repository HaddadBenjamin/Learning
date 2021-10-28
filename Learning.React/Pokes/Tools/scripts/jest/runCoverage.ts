// @ts-ignore
const cmd = require('node-cmd');

const parameters = process.argv.splice(2);

if (parameters.length === 0)
  console.error(
    "runCoverage.ts need at least one parameter, the first parameter is the directory path to cover, ex: src/domains/todo\nAll other parameters should not start by '--'\nUsage example: npm run test:coverage shared/redux"
  );
else {
  try {
    // const coverageThredshold =  '--coverageThreshold=\'{\"global\": { `\"branches`\": 100, \"functions\": 0, \"lines\": 0, \"statements\": 0 },
    // \"src/domains/todos\": { \"branches\": 90, \"functions\": 90, \"lines\": 90, \"statements\": 90 },
    // \"src/domains/root\": {\"branches\": 90, \"functions\": 90, \"lines\": 90, \"statements\": 90 },
    // \"src/devTools\": {\"branches\": 90, \"functions\": 90, \"lines\": 90, \"statements\": 90 } }'
    // const coverageThredshold = `--coverageThreshold='{\"global\":{\"statements\":\"80\"}}`
    const coverageBasePath = parameters[0];
    const otherParameters =
      parameters.length >= 1 ? parameters.splice(1).map(p => `--${p}`) : [];
    const watchAll = `--watchAll=false`;
    const testPathPattern = `--testPathPattern=${coverageBasePath}/`;
    const coverage = '--coverage';
    const commandParameters = `npm test -- ${watchAll} ${testPathPattern} ${coverage} ${otherParameters}`;

    cmd.runSync(commandParameters);

    console.log(`Executed command: ${commandParameters}`);
  } catch (error) {
    console.error(
      `runCoverage.js encounter the following error during parsing or executing the command ${error}`
    );
  }
}
