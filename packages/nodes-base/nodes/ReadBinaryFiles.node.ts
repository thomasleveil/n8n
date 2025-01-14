import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as glob from 'glob-promise';
import * as path from 'path';

import {
	readFile as fsReadFile,
} from 'fs';
import { promisify } from "util";

const fsReadFileAsync = promisify(fsReadFile);


export class ReadBinaryFiles implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Read Binary Files',
		name: 'readBinaryFiles',
		icon: 'fa:file-import',
		group: ['input'],
		version: 1,
		description: 'Reads binary files from disk',
		defaults: {
			name: 'Read Binary Files',
			color: '#44AA44',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'File Selector',
				name: 'fileSelector',
				type: 'string',
				default: '',
				required: true,
				placeholder: '*.jpg',
				description: 'Pattern for files to read.',
			},
			{
				displayName: 'Property Name',
				name: 'dataPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				description: 'Name of the binary property to which to<br />write the data of the read files.',
			},
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const fileSelector = this.getNodeParameter('fileSelector', 0) as string;
		const dataPropertyName = this.getNodeParameter('dataPropertyName', 0) as string;

		const files = await glob(fileSelector);

		const items: INodeExecutionData[] = [];
		let item: INodeExecutionData;
		let data: Buffer;
		let fileName: string;
		for (const filePath of files) {
			data = await fsReadFileAsync(filePath) as Buffer;

			fileName = path.parse(filePath).base;
			item = {
				binary: {
					[dataPropertyName]: await this.helpers.prepareBinaryData(data, fileName)
				},
				json: {},
			};

			items.push(item);
		}

		return this.prepareOutputData(items);
	}
}
