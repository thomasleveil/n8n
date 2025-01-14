import * as config from '../config';
import * as express from 'express';
import {
	readFile as fsReadFile,
} from 'fs';
import { promisify } from "util";
import { IDataObject } from 'n8n-workflow';

const fsReadFileAsync = promisify(fsReadFile);

/**
 * Displays a message to the user
 *
 * @export
 * @param {string} message The message to display
 * @param {string} [level='log']
 */
export function logOutput(message: string, level = 'log'): void {
	if (level === 'log') {
		console.log(message);
	} else if (level === 'error') {
		console.error(message);
	}
}


/**
 * Returns the base URL n8n is reachable from
 *
 * @export
 * @returns {string}
 */
export function getBaseUrl(): string {
	const protocol = config.get('protocol') as string;
	const host = config.get('host') as string;
	const port = config.get('port') as number;

	if (protocol === 'http' && port === 80 || protocol === 'https' && port === 443) {
		return `${protocol}://${host}/`;
	}
	return `${protocol}://${host}:${port}/`;
}


/**
 * Returns the session id if one is set
 *
 * @export
 * @param {express.Request} req
 * @returns {(string | undefined)}
 */
export function getSessionId(req: express.Request): string | undefined {
	return req.headers.sessionid as string | undefined;
}


/**
 * Gets value from config with support for "_FILE" environment variables
 *
 * @export
 * @param {string} configKey The key of the config data to get
 * @returns {(Promise<string | boolean | number | undefined>)}
 */
export async function getConfigValue(configKey: string): Promise<string | boolean | number | undefined> {
	const configKeyParts = configKey.split('.');

	// Get the environment variable
	const configSchema = config.getSchema();
	let currentSchema = configSchema.properties as IDataObject;
	for (const key of configKeyParts) {
		if (currentSchema[key] === undefined) {
			throw new Error(`Key "${key}" of ConfigKey "${configKey}" does not exist`);
		} else if ((currentSchema[key]! as IDataObject).properties === undefined) {
			currentSchema = currentSchema[key] as IDataObject;
		} else {
			currentSchema = (currentSchema[key] as IDataObject).properties as IDataObject;
		}
	}

	// Check if environment variable is defined for config key
	if (currentSchema.env === undefined) {
		// No environment variable defined, so return value from config
		return config.get(configKey);
	}

	// Check if special file enviroment variable exists
	const fileEnvironmentVariable = process.env[currentSchema.env + '_FILE'];
	if (fileEnvironmentVariable === undefined) {
		// Does not exist, so return value from config
		return config.get(configKey);
	}

	let data;
	try {
		data = await fsReadFileAsync(fileEnvironmentVariable, 'utf8') as string;
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw new Error(`The file "${fileEnvironmentVariable}" could not be found.`);
		}

		throw error;
	}

	return data;
}
