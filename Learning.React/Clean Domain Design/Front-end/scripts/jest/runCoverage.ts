//Voir comment créer des scripts : ts (voir le nodemon de devtools) / library pour faire des scripts (exec de child process) / récupérer et envoyer des paramètres (Yargs ? Est-ce nécessaire ?) pouvoir le rendu dans la console (console.log)

import {exec, spawn} from 'child_process'
import { parse } from 'yargs'
import {getApiMockPaths} from "../../src/devTools/server/server.util";
let cmd = require('node-cmd');

(async () =>
{
	const parameters = process.argv.splice(2)
	
	if (parameters.length === 0)
		console.error('runCoverage.ts need at least one parameter, the first parameter is the directory path to cover, ex: src/domains/todo\nAll other parameters should not start by \'--\'')
	else
	{
		try
		{
			const coverageBasePath = parameters[0]
			const otherParameters = parameters.length >= 1 ? parameters.splice(1).map(p => `--${p}`) : []
			const watchAll = `--watchAll=false`//${process.env.CI ? 'true' : 'false'}`
			const collectCoverageFrom = `--collectCoverageFrom=\'[\"${coverageBasePath}/**\"]\'`
			const testPathPattern = `--testPathPattern=${coverageBasePath}`
			const coverage = '--coverage'
			const apiMockPaths = (await getApiMockPaths()).map(p => `\"${p}\"`).join(", ")
			const modulePathIgnorePatterns = `--modulePathIgnorePatterns=\'[${apiMockPaths}]\'`
			const commandParameters = ['test', watchAll, collectCoverageFrom, testPathPattern, modulePathIgnorePatterns, coverage, ...otherParameters]
			
			const syncDir=cmd.runSync("npm test -- --watchAll=false --testPathPattern=src/domains/root/ --collectCoverageFrom='[\"src/domains/root/**\"]' --coverage");
			
			console.log(`
        Sync Err ${syncDir.err}
        Sync stderr: ${JSON.stringify(syncDir.stderr)}
        Sync Data ${syncDir.data}
    `);
			
			//const jestProcess = spawn('node_modules\\react-scripts\\.bin\\react-scripts.js', ['test'])//commandParameters)
			// const jestProcess = spawn('C:\\Users\\hadda\\OneDrive\\Bureau\\Projets\\Learning\\Learning.React\\Clean Domain Design\\Front-end\\node_modules\\react-scripts\\bin\\react-scripts.js', ['test'])//commandParameters)
			// const jestProcess = exec('cmd.exe run test')// ['npm run test'])
			//
			// jestProcess.stdout.on('data', console.log)
			// jestProcess.stderr.on('data', console.error)
			// jestProcess.on('close', (code) => console.log(`child process exited with code ${code}`))
		} catch (error) {
			console.error(`runCoverage.js encounter the following error during parsing or executing the command ${error}`)
		}
	}
})()