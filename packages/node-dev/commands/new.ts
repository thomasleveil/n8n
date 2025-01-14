import * as changeCase from 'change-case';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import { join } from 'path';
import Vorpal = require('vorpal');
import { Args } from 'vorpal';

const { promisify } = require('util');
const fsAccess = promisify(fs.access);

import {
	createTemplate
} from '../src';

module.exports = (vorpal: Vorpal) => {
	return vorpal
		.command('new')
		// @ts-ignore
		.description('Create new credentials/node')
		.action(async (args: Args) => {
			try {
				console.log('\nCreate new credentials/node');
				console.log('=========================');

				// Ask for the type of not to be created
				const typeQuestion: inquirer.QuestionCollection = {
					name: 'type',
					type: 'list',
					default: 'Node',
					message: 'What do you want to create?',
					choices: [
						'Credentials',
						'Node',
					],
				};

				const typeAnswers = await inquirer.prompt(typeQuestion);

				let sourceFolder = '';
				const sourceFileName = 'simple.ts';
				let defaultName = '';
				let getDescription = false;


				if (typeAnswers.type === 'Node') {
					// Create new node

					getDescription = true;

					const nodeTypeQuestion: inquirer.QuestionCollection = {
						name: 'nodeType',
						type: 'list',
						default: 'Execute',
						message: 'What kind of node do you want to create?',
						choices: [
							'Execute',
							'Trigger',
							'Webhook',
						],
					};

					const nodeTypeAnswers = await inquirer.prompt(nodeTypeQuestion);

					// Choose a the template-source-file depending on user input.
					sourceFolder = 'execute';
					defaultName = 'My Node';
					if (nodeTypeAnswers.nodeType === 'Trigger') {
						sourceFolder = 'trigger';
						defaultName = 'My Trigger';
					} else if (nodeTypeAnswers.nodeType === 'Webhook') {
						sourceFolder = 'webhook';
						defaultName = 'My Webhook';
					}
				} else {
					// Create new credentials

					sourceFolder = 'credentials';
					defaultName = 'My Service API';
				}

				// Ask additional questions to know with what values the
				// variables in the template file should be replaced with
				const additionalQuestions = [
					{
						name: 'name',
						type: 'input',
						default: defaultName,
						message: 'How should the node be called?',
					},
				];

				if (getDescription === true) {
					// Get also a node description
					additionalQuestions.push({
						name: 'description',
						type: 'input',
						default: 'Node converts input data to chocolate',
						message: 'What should the node description be?',
					});
				}

				const additionalAnswers = await inquirer.prompt(additionalQuestions as inquirer.QuestionCollection);

				const nodeName = additionalAnswers.name;

				// Define the source file to be used and the location and name of the new
				// node file
				const destinationFilePath = join(process.cwd(), `${changeCase.pascalCase(nodeName)}.${typeAnswers.type.toLowerCase()}.ts`);

				const sourceFilePath = join(__dirname, '../../templates', sourceFolder, sourceFileName);

				// Check if node with the same name already exists in target folder
				// to not overwrite it by accident
				try {
					await fsAccess(destinationFilePath);

					// File does already exist. So ask if it should be overwritten.
					const overwriteQuestion: inquirer.QuestionCollection = [
						{
							name: 'overwrite',
							type: 'confirm',
							default: false,
							message: `The file "${destinationFilePath}" already exists and would be overwritten. Do you want to proceed and overwrite the file?`,
						},
					];

					const overwriteAnswers = await inquirer.prompt(overwriteQuestion);

					if (overwriteAnswers.overwrite === false) {
						console.log('\nNode creation got canceled!');
						return;
					}
				} catch (error) {
					// File does not exist. That is exactly what we want so go on.
				}

				// Make sure that the variables in the template file get formated
				// in the correct way
				const replaceValues = {
					ClassNameReplace: changeCase.pascalCase(nodeName),
					DisplayNameReplace: changeCase.titleCase(nodeName),
					N8nNameReplace: changeCase.camelCase(nodeName),
					NodeDescriptionReplace: additionalAnswers.description,
				};

				await createTemplate(sourceFilePath, destinationFilePath, replaceValues);

				console.log('\nExecution was successfull:');
				console.log('====================================');

				console.log('Node got created: ' + destinationFilePath);
			} catch (error) {
				console.error('\nGOT ERROR');
				console.error('====================================');
				console.error(error.message);
				return;
			}

		});
};
