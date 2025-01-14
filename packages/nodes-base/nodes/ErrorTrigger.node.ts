import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';


export class ErrorTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Error Trigger',
		name: 'errorTrigger',
		icon: 'fa:bug',
		group: ['trigger'],
		version: 1,
		description: 'Triggers the workflow when another workflow has an error',
		maxNodes: 1,
		defaults: {
			name: 'Error Trigger',
			color: '#0000FF',
		},
		inputs: [],
		outputs: ['main'],
		properties: []
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const mode = this.getMode();

		if (mode === 'manual' && items.length === 1 && Object.keys(items[0].json).length === 0 && items[0].binary === undefined) {
			// If we are in manual mode and no input data got provided we return
			// example data to allow to develope and test errorWorkflows easily
			items[0].json = {
				execution: {
					error: {
						message: 'Example Error Message',
						stack: 'Stacktrace'
					},
					lastNodeExecuted: 'Node With Error',
					mode: 'manual'
				},
				workflow: {
					id: '1',
					name: 'Example Workflow'
				}
			};
		}

		return this.prepareOutputData(items);
	}
}
