import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeTypeDescription,
	INodeExecutionData,
	INodeType,
} from 'n8n-workflow';

import {
	apiRequest,
	apiRequestAllItems,
} from './GenericFunctions';

export class Airtable implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Airtable',
		name: 'airtable',
		icon: 'file:airtable.png',
		group: ['input'],
		version: 1,
		description: 'Read, update, write and delete data to Airtable',
		defaults: {
			name: 'Airtable',
			color: '#445599',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'airtableApi',
				required: true,
			}
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Append',
						value: 'append',
						description: 'Appends the data to a table',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Deletes data from a table'
					},
					{
						name: 'List',
						value: 'list',
						description: 'List data from a table'
					},
					{
						name: 'Read',
						value: 'read',
						description: 'Reads data from a table'
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Updates data in a table'
					},
				],
				default: 'read',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         All
			// ----------------------------------
			{
				displayName: 'Application',
				name: 'application',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getApplications',
				},
				options: [],
				default: '',
				required: true,
				description: 'The application to access',
			},
			{
				displayName: 'Table',
				name: 'table',
				type: 'string',
				default: '',
				placeholder: 'Stories',
				required: true,
				description: 'The name of table to access',
			},

			// ----------------------------------
			//         append
			// ----------------------------------
			{
				displayName: 'Add All Fields',
				name: 'addAllFields',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: [
							'append',
						],
					},
				},
				default: true,
				description: 'If all fields should be send to Airtable or only specific ones.',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Field',
				},
				displayOptions: {
					show: {
						addAllFields: [
							false,
						],
						operation: [
							'append',
						],
					},
				},
				default: '',
				placeholder: 'Name',
				required: true,
				description: 'The name of fields of which the data should be send to Airtable.',
			},

			// ----------------------------------
			//         delete
			// ----------------------------------
			{
				displayName: 'Id',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'delete',
						],
					},
				},
				default: '',
				required: true,
				description: 'Id of the record to delete.',
			},

			// ----------------------------------
			//         list
			// ----------------------------------
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: [
							'list',
						],
					},
				},
				default: true,
				description: 'If all results should be returned or only up to a given limit.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: [
							'list',
						],
						returnAll: [
							false,
						],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 100,
				description: 'How many results to return.',
			},

			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				displayOptions: {
					show: {
						operation: [
							'list'
						],
					},
				},
				default: {},
				description: 'Additional options which decide which records should be returned',
				placeholder: 'Add Option',
				options: [
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						typeOptions: {
							multipleValues: true,
							multipleValueButtonText: 'Add Field',
						},
						default: '',
						placeholder: 'Name',
						description: 'Only data for fields whose names are in this list will be included in the records.',
					},
					{
						displayName: 'Filter By Formula',
						name: 'filterByFormula',
						type: 'string',
						default: '',
						placeholder: 'NOT({Name} = \'\')',
						description: 'A formula used to filter records. The formula will be evaluated for each<br />record, and if the result is not 0, false, "", NaN, [], or #Error!<br />the record will be included in the response.',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						placeholder: 'Add Sort Rule',
						description: 'Defines how the returned records should be ordered.',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						default: {},
						options: [
							{
								name: 'property',
								displayName: 'Property',
								values: [
									{
										displayName: 'Field',
										name: 'field',
										type: 'string',
										default: '',
										description: 'Name of the field to sort on.',
									},
									{
										displayName: 'Direction',
										name: 'direction',
										type: 'options',
										options: [
											{
												name: 'ASC',
												value: 'asc',
												description: 'Sort in ascending order (small -> large)',
											},
											{
												name: 'DESC',
												value: 'desc',
												description: 'Sort in descending order (large -> small)'
											},
										],
										default: 'asc',
										description: 'The sort direction.',
									},
								]
							},
						],
					},
					{
						displayName: 'View',
						name: 'view',
						type: 'string',
						default: '',
						placeholder: 'All Stories',
						description: 'The name or ID of a view in the Stories table. If set,<br />only the records in that view will be returned. The records<br />will be sorted according to the order of the view.',
					},
				],
			},

			// ----------------------------------
			//         read
			// ----------------------------------
			{
				displayName: 'Id',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'read',
						],
					},
				},
				default: '',
				required: true,
				description: 'Id of the record to return.',
			},

			// ----------------------------------
			//         update
			// ----------------------------------
			{
				displayName: 'Id',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
					},
				},
				default: '',
				required: true,
				description: 'Id of the record to update.',
			},
			{
				displayName: 'Update All Fields',
				name: 'updateAllFields',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
					},
				},
				default: true,
				description: 'If all fields should be send to Airtable or only specific ones.',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Field',
				},
				displayOptions: {
					show: {
						updateAllFields: [
							false,
						],
						operation: [
							'update',
						],
					},
				},
				default: '',
				placeholder: 'Name',
				required: true,
				description: 'The name of fields of which the data should be send to Airtable.',
			},
		],
	};

	methods = {
		loadOptions: {
			// Get all the available applications to display them to user so that he can
			// select them easily
			async getApplications(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const endpoint = 'meta';
				const responseData = await apiRequest.call(this, 'GET', endpoint, {});

				if (responseData.applications === undefined) {
					throw new Error('No data got returned');
				}

				const returnData: INodePropertyOptions[] = [];
				for (const baseData of responseData.applications) {
					returnData.push({
						name: baseData.name,
						value: baseData.id,
					});
				}

				return returnData;
			},
		},
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		let responseData;

		const operation = this.getNodeParameter('operation', 0) as string;

		const application = this.getNodeParameter('application', 0) as string;
		const table = this.getNodeParameter('table', 0) as string;

		let returnAll = false;
		let endpoint = '';
		let requestMethod = '';

		const body: IDataObject = {};
		const qs: IDataObject = {};

		if (operation === 'append') {
			// ----------------------------------
			//         append
			// ----------------------------------

			requestMethod = 'POST';
			endpoint = `${application}/${table}`;

			let addAllFields: boolean;
			let fields: string[];
			for (let i = 0; i < items.length; i++) {
				addAllFields = this.getNodeParameter('addAllFields', i) as boolean;

				if (addAllFields === true) {
					// Add all the fields the item has
					body.fields = items[i].json;
				} else {
					// Add only the specified fields
					body.fields = {} as IDataObject;

					fields = this.getNodeParameter('fields', i, []) as string[];

					for (const fieldName of fields) {
						// @ts-ignore
						body.fields[fieldName] = items[i].json[fieldName];
					}
				}

				responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

				returnData.push(responseData);
			}

		} else if (operation === 'delete') {
			requestMethod = 'DELETE';

			let id: string;
			for (let i = 0; i < items.length; i++) {
				id = this.getNodeParameter('id', i) as string;

				endpoint = `${application}/${table}/${id}`;

				// Make one request after another. This is slower but makes
				// sure that we do not run into the rate limit they have in
				// place and so block for 30 seconds. Later some global
				// functionality in core should make it easy to make requests
				// according to specific rules like not more than 5 requests
				// per seconds.
				responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

				returnData.push(responseData);
			}

		} else if (operation === 'list') {
			// ----------------------------------
			//         list
			// ----------------------------------

			requestMethod = 'GET';
			endpoint = `${application}/${table}`;

			returnAll = this.getNodeParameter('returnAll', 0) as boolean;

			const additionalOptions = this.getNodeParameter('additionalOptions', 0, {}) as IDataObject;

			for (const key of Object.keys(additionalOptions)) {
				if (key === 'sort' && (additionalOptions.sort as IDataObject).property !== undefined) {
					qs[key] = (additionalOptions[key] as IDataObject).property;
				} else {
					qs[key] = additionalOptions[key];
				}
			}

			if (returnAll === true) {
				responseData = await apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
			} else {
				qs.maxRecords = this.getNodeParameter('limit', 0) as number;
				responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
			}

			returnData.push.apply(returnData, responseData.records);

		} else if (operation === 'read') {
			// ----------------------------------
			//         read
			// ----------------------------------

			requestMethod = 'GET';

			let id: string;
			for (let i = 0; i < items.length; i++) {

				id = this.getNodeParameter('id', i) as string;

				endpoint = `${application}/${table}/${id}`;

				// Make one request after another. This is slower but makes
				// sure that we do not run into the rate limit they have in
				// place and so block for 30 seconds. Later some global
				// functionality in core should make it easy to make requests
				// according to specific rules like not more than 5 requests
				// per seconds.

				responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

				returnData.push(responseData);
			}

		} else if (operation === 'update') {
			// ----------------------------------
			//         update
			// ----------------------------------

			requestMethod = 'PATCH';

			let id: string;
			let updateAllFields: boolean;
			let fields: string[];
			for (let i = 0; i < items.length; i++) {
				updateAllFields = this.getNodeParameter('updateAllFields', i) as boolean;

				if (updateAllFields === true) {
					// Update all the fields the item has
					body.fields = items[i].json;
				} else {
					// Update only the specified fields
					body.fields = {} as IDataObject;

					fields = this.getNodeParameter('fields', i, []) as string[];

					for (const fieldName of fields) {
						// @ts-ignore
						body.fields[fieldName] = items[i].json[fieldName];
					}
				}

				id = this.getNodeParameter('id', i) as string;

				endpoint = `${application}/${table}/${id}`;

				// Make one request after another. This is slower but makes
				// sure that we do not run into the rate limit they have in
				// place and so block for 30 seconds. Later some global
				// functionality in core should make it easy to make requests
				// according to specific rules like not more than 5 requests
				// per seconds.

				responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

				returnData.push(responseData);
			}

		} else {
			throw new Error(`The operation "${operation}" is not known!`);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
