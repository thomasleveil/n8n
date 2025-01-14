
import {
	NodeHelpers,
	INodeParameters,
	INodeProperties,
} from '../src';

describe('Workflow', () => {

	describe('getParameterValue', () => {

		const tests: Array<{
			description: string;
			input: {
				nodePropertiesArray: INodeProperties[];
				nodeValues: INodeParameters;
			},
			output: {
				noneDisplayedFalse: {
					defaultsFalse: INodeParameters;
					defaultsTrue: INodeParameters;
				},
				noneDisplayedTrue: {
					defaultsFalse: INodeParameters;
					defaultsTrue: INodeParameters;
				},
			};
		}> = [
				{
					description: 'simple values.',
					input: {
						nodePropertiesArray: [
							{
								name: 'string1',
								displayName: 'String 1',
								type: 'string',
								default: '',
							},
							{
								name: 'string2',
								displayName: 'String 2',
								type: 'string',
								default: 'default string 2',
							},
							{
								name: 'string3',
								displayName: 'String 3',
								type: 'string',
								default: 'default string 3',
							},
							{
								name: 'number1',
								displayName: 'Number 1',
								type: 'number',
								default: 10,
							},
							{
								name: 'number2',
								displayName: 'Number 2',
								type: 'number',
								default: 10,
							},
							{
								name: 'number3',
								displayName: 'Number 3',
								type: 'number',
								default: 10,
							},
							{
								name: 'boolean1',
								displayName: 'Boolean 1',
								type: 'boolean',
								default: false,
							},
							{
								name: 'boolean2',
								displayName: 'Boolean 2',
								type: 'boolean',
								default: false,
							},
							{
								name: 'boolean3',
								displayName: 'Boolean 3',
								type: 'boolean',
								default: true,
							},
							{
								name: 'boolean4',
								displayName: 'Boolean 4',
								type: 'boolean',
								default: true,
							},
							{
								name: 'boolean5',
								displayName: 'Boolean 5',
								type: 'boolean',
								default: false,
							},
							{
								name: 'boolean6',
								displayName: 'Boolean 6',
								type: 'boolean',
								default: true,
							},
						],
						nodeValues: {
							boolean1: true,
							boolean3: false,
							boolean5: false,
							boolean6: true,
							string1: 'different',
							number1: 1,
							number3: 0,
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								boolean1: true,
								boolean3: false,
								string1: 'different',
								number1: 1,
								number3: 0,
							},
							defaultsTrue: {
								boolean1: true,
								boolean2: false,
								boolean3: false,
								boolean4: true,
								boolean5: false,
								boolean6: true,
								string1: 'different',
								string2: 'default string 2',
								string3: 'default string 3',
								number1: 1,
								number2: 10,
								number3: 0,
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								boolean1: true,
								boolean3: false,
								string1: 'different',
								number1: 1,
								number3: 0,
							},
							defaultsTrue: {
								boolean1: true,
								boolean2: false,
								boolean3: false,
								boolean4: true,
								boolean5: false,
								boolean6: true,
								string1: 'different',
								string2: 'default string 2',
								string3: 'default string 3',
								number1: 1,
								number2: 10,
								number3: 0,
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (match) which is boolean. All values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'boolean1',
								displayName: 'boolean1',
								type: 'boolean',
								default: false,
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									show: {
										boolean1: [
											true
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
							boolean1: true,
							string1: 'own string1',
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								boolean1: true,
								string1: 'own string1',
							},
							defaultsTrue: {
								boolean1: true,
								string1: 'own string1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								boolean1: true,
								string1: 'own string1',
							},
							defaultsTrue: {
								boolean1: true,
								string1: 'own string1',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "hide" (match) which is boolean. All values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'boolean1',
								displayName: 'boolean1',
								type: 'boolean',
								default: false,
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									hide: {
										boolean1: [
											true
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
							boolean1: true,
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								boolean1: true,
							},
							defaultsTrue: {
								boolean1: true,
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								boolean1: true,
							},
							defaultsTrue: {
								boolean1: true,
								string1: 'default string1',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (match) which is boolean. One values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'boolean1',
								displayName: 'boolean1',
								type: 'boolean',
								default: false,
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									show: {
										boolean1: [
											true
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
							boolean1: true,
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								boolean1: true,
							},
							defaultsTrue: {
								boolean1: true,
								string1: 'default string1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								boolean1: true,
							},
							defaultsTrue: {
								boolean1: true,
								string1: 'default string1',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (match). No values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									show: {
										mode: [
											'mode1'
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
								string1: 'default string1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
								string1: 'default string1',
							},
						},
					},
				},
				{
				 description: 'simple values with displayOptions "show" (match) on two which depend on each other of which is boolean. One value should be displayed. One values set (none-default).',
					input: {
						nodePropertiesArray: [
							{
								name: 'string1',
								displayName: 'string1',
								type: 'string',
								default: 'default string1',
							},
							{
								name: 'boolean1',
								displayName: 'boolean1',
								displayOptions: {
									show: {
										string1: [
											'default string1'
										],
									},
								},
								type: 'boolean',
								default: false,
							},
							{
								name: 'string2',
								displayName: 'string2',
								displayOptions: {
									show: {
										boolean1: [
											true
										],
									},
								},
								type: 'string',
								default: 'default string2',
							},
						],
						nodeValues: {
							boolean1: true,
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								boolean1: true,
							},
							defaultsTrue: {
								string1: 'default string1',
								boolean1: true,
								string2: 'default string2',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								boolean1: true,
							},
							defaultsTrue: {
								string1: 'default string1',
								boolean1: true,
								string2: 'default string2',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (match) on two which depend on each other of which is boolean. One value should be displayed. One values set. (default)',
					input: {
						nodePropertiesArray: [
							{
								name: 'string1',
								displayName: 'string1',
								type: 'string',
								default: 'default string1',
							},
							{
								name: 'boolean1',
								displayName: 'boolean1',
								displayOptions: {
									show: {
										string1: [
											'default string1'
										],
									},
								},
								type: 'boolean',
								default: false,
							},
							{
								name: 'string2',
								displayName: 'string2',
								displayOptions: {
									show: {
										boolean1: [
											true
										],
									},
								},
								type: 'string',
								default: 'default string2',
							},
						],
						nodeValues: {
							boolean1: false,
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								string1: 'default string1',
								boolean1: false,
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								string1: 'default string1',
								boolean1: false,
								string2: 'default string2',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (match). All values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									show: {
										mode: [
											'mode1'
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
							mode: 'mode1',
							string1: 'default string1',
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
								string1: 'default string1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
								string1: 'default string1',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (no-match). No values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									show: {
										mode: [
											'mode2'
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
								string1: 'default string1',
							},
						},
					},
				},
				{
					description: 'simple values with displayOptions "show" (no-match). All values set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'string1',
								displayName: 'string1',
								displayOptions: {
									show: {
										mode: [
											'mode2'
										],
									},
								},
								type: 'string',
								default: 'default string1',
							},
						],
						nodeValues: {
							mode: 'mode1',
							string1: 'default string1',
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mode: 'mode1',
								string1: 'default string1',
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: true". One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'values',
								displayName: 'Values',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'boolean',
										displayName: 'Boolean',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												name: 'boolean1',
												displayName: 'boolean1',
												type: 'boolean',
												default: false,
											},
										],
									},
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												displayName: 'number1',
												name: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: [
									{
										number1: 1,
									},
								],
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: [
										{
											number1: 1,
										},
									],
								},
							},
							defaultsTrue: {
								values: {
									number: [
										{
											string1: 'default string1',
											number1: 1,
										},
									],
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: [
										{
											number1: 1
										},
									],
								},
							},
							defaultsTrue: {
								values: {
									number: [
										{
											string1: 'default string1',
											number1: 1,
										},
									],
								},
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: false". One value set.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'Values',
								name: 'values',
								type: 'fixedCollection',
								default: {},
								options: [
									{
										name: 'boolean',
										displayName: 'Boolean',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												name: 'boolean1',
												displayName: 'boolean1',
												type: 'boolean',
												default: false,
											},
										],
									},
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												displayName: 'number1',
												name: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
									{
										name: 'singleString',
										displayName: 'Single String',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default singleString1',
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: {
									number1: 1,
								}
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: {
										number1: 1,
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										string1: 'default string1',
										number1: 1,
									},
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: {
										number1: 1,
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										string1: 'default string1',
										number1: 1,
									},
								},
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: false". Two values set one single one.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'Values',
								name: 'values',
								type: 'fixedCollection',
								default: {},
								options: [
									{
										name: 'boolean',
										displayName: 'Boolean',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												name: 'boolean1',
												displayName: 'boolean1',
												type: 'boolean',
												default: false,
											},
										],
									},
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												displayName: 'number1',
												name: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
									{
										name: 'singleString',
										displayName: 'Single String',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default singleString1',
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: {
									number1: 1,
								},
								singleString: {
									string1: 'value1'
								}
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: {
										number1: 1,
									},
									singleString: {
										string1: 'value1'
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										string1: 'default string1',
										number1: 1,
									},
									singleString: {
										string1: 'value1'
									},
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: {
										number1: 1,
									},
									singleString: {
										string1: 'value1'
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										string1: 'default string1',
										number1: 1,
									},
									singleString: {
										string1: 'value1'
									},
								},
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: true" and complex type "collection"  with "multipleValues: true". One value set each.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'Values',
								name: 'values',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								description: 'The value to set.',
								default: {},
								options: [
									{
										name: 'boolean',
										displayName: 'Boolean',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												name: 'boolean1',
												displayName: 'boolean1',
												type: 'boolean',
												default: false,
											},
										],
									},
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												default: 'default string1',
											},
											{
												name: 'number1',
												displayName: 'number1',
												type: 'number',
												default: 0,
											},
											{
												name: 'collection1',
												displayName: 'collection1',
												type: 'collection',
												typeOptions: {
													multipleValues: true,
												},
												default: {},
												options: [
													{
														name: 'string1',
														displayName: 'string1',
														type: 'string',
														default: 'default string1',
													},
													{
														name: 'string2',
														displayName: 'string2',
														type: 'string',
														default: 'default string2',
													},
												],
											},
										],
									},

								],
							},
						],
						nodeValues: {
							values: {
								number: [
									{
										number1: 1,
										collection1: [
											{
												string1: 'value1'
											}
										],
									},
								],
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: [
										{
											number1: 1,
											collection1: [
												{
													string1: 'value1'
												}
											],
										},
									],
								},
							},
							defaultsTrue: {
								values: {
									number: [
										{
											string1: 'default string1',
											number1: 1,
											collection1: [
												{
													string1: 'value1'
												}
											],
										},
									],
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: [
										{
											number1: 1,
											collection1: [
												{
													string1: 'value1'
												}
											],
										},
									],
								},
							},
							defaultsTrue: {
								values: {
									number: [
										{
											string1: 'default string1',
											number1: 1,
											collection1: [
												{
													string1: 'value1'
												}
											],
										},
									],
								},
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: false" and with displayOptions "show" (match) on option. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'values',
								displayName: 'Values',
								type: 'fixedCollection',
								default: {},
								options: [
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'mode',
												displayName: 'mode',
												type: 'string',
												default: 'mode1',
											},
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												displayOptions: {
													show: {
														mode: [
															'mode1'
														],
													},
												},
												default: 'default string1',
											},
											{
												name: 'number1',
												displayName: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: {
									number1: 1,
								},
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: {
										number1: 1,
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										mode: 'mode1',
										string1: 'default string1',
										number1: 1,
									},
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: {
										number1: 1,
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										mode: 'mode1',
										string1: 'default string1',
										number1: 1,
									},
								},
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: false" and with displayOptions "show" (match) on option which references root-value. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'values',
								displayName: 'Values',
								type: 'fixedCollection',
								default: {},
								options: [
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												displayOptions: {
													show: {
														'/mode': [
															'mode1'
														],
													},
												},
												default: 'default string1',
											},
											{
												name: 'number1',
												displayName: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: {
									string1: 'own string1',
								},
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: {
										string1: 'own string1',
									},
								},
							},
							defaultsTrue: {
								mode: 'mode1',
								values: {
									number: {
										string1: 'own string1',
										number1: 0,
									},
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: {
										string1: 'own string1',
									},
								},
							},
							defaultsTrue: {
								mode: 'mode1',
								values: {
									number: {
										string1: 'own string1',
										number1: 0,
									},
								},
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: false" and with displayOptions "show" (no-match) on option which references root-value. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'values',
								displayName: 'Values',
								type: 'fixedCollection',
								default: {},
								options: [
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'string1',
												displayName: 'string1',
												type: 'string',
												displayOptions: {
													show: {
														'/mode': [
															'mode2'
														],
													},
												},
												default: 'default string1',
											},
											{
												name: 'number1',
												displayName: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: {
									string1: 'own string1',
								},
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {},
							defaultsTrue: {
								mode: 'mode1',
								values: {
									number: {
										number1: 0,
									},
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: {
										string1: 'own string1',
									},
								},
							},
							defaultsTrue: {
								mode: 'mode1',
								values: {
									number: {
										string1: 'own string1',
										number1: 0,
									},
								},
							},
						},
					},
				},
				// Remember it is correct that default strings get returned here even when returnDefaults
				// is set to false because if they would not, there would be no way to know which value
				// got added and which one not.
				{
					description: 'complex type "collection" with "multipleValues: false" and with displayOptions "show" (match) on option which references root-value. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'values',
								displayName: 'Values',
								type: 'collection',
								default: {},
								options: [
									{
										name: 'string1',
										displayName: 'string1',
										type: 'string',
										displayOptions: {
											show: {
												'/mode': [
													'mode1'
												],
											},
										},
										default: 'default string1',
									},
									{
										name: 'number1',
										displayName: 'number1',
										type: 'number',
										default: 0,
									},
								],
							},
						],
						nodeValues: {
							values: {
								string1: 'own string1',
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									string1: 'own string1',
								},
							},
							defaultsTrue: {
								mode: 'mode1',
								values: {
									string1: 'own string1',
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									string1: 'own string1',
								},
							},
							defaultsTrue: {
								mode: 'mode1',
								values: {
									string1: 'own string1',
								},
							},
						},
					},
				},
				// Remember it is correct that default strings get returned here even when returnDefaults
				// is set to false because if they would not, there would be no way to know which value
				// got added and which one not.
				{
					description: 'complex type "collection" with "multipleValues: false" and with displayOptions "show" (no-match) on option which references root-value. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'values',
								displayName: 'Values',
								type: 'collection',
								default: {},
								options: [
									{
										name: 'string1',
										displayName: 'string1',
										type: 'string',
										displayOptions: {
											show: {
												'/mode': [
													'mode2'
												],
											},
										},
										default: 'default string1',
									},
									{
										name: 'number1',
										displayName: 'number1',
										type: 'number',
										default: 0,
									},
								],
							},
						],
						nodeValues: {
							values: {
								string1: 'own string1',
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								// TODO: Write some code which cleans up data like that
								values: {},
							},
							defaultsTrue: {
								mode: 'mode1',
								values: {
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									string1: 'own string1',
								},
							},
							defaultsTrue: {
								mode: "mode1",
								values: {
									string1: 'own string1',
								},
							},
						},
					},
				},
				// Remember it is correct that default strings get returned here even when returnDefaults
				// is set to false because if they would not, there would be no way to know which value
				// got added and which one not.
				{
					description: 'complex type "collection" with "multipleValues: true" and with displayOptions "show" (match) on option which references root-value. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'values',
								displayName: 'Values',
								type: 'collection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'string1',
										displayName: 'string1',
										type: 'string',
										displayOptions: {
											show: {
												'/mode': [
													'mode1'
												],
											},
										},
										default: 'default string1',
									},
									{
										name: 'number1',
										displayName: 'number1',
										type: 'number',
										default: 0,
									},
								],
							},
						],
						nodeValues: {
							values: [
								{
									string1: 'own string1',
								}
							],
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: [
									{
										string1: 'own string1',
									}
								],
							},
							defaultsTrue: {
								mode: 'mode1',
								values: [
									{
										string1: 'own string1',
									}
								],
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: [
									{
										string1: 'own string1',
									}
								],
							},
							defaultsTrue: {
								mode: 'mode1',
								values: [
									{
										string1: 'own string1',
									}
								],
							},
						},
					},
				},

				// Remember it is correct that default strings get returned here even when returnDefaults
				// is set to false because if they would not, there would be no way to know which value
				// got added and which one not.
				{
					description: 'complex type "collection" with "multipleValues: true" and with displayOptions "show" (no-match) on option which references root-value. One value set.',
					input: {
						nodePropertiesArray: [
							{
								name: 'mode',
								displayName: 'mode',
								type: 'string',
								default: 'mode1',
							},
							{
								name: 'values',
								displayName: 'Values',
								type: 'collection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										name: 'string1',
										displayName: 'string1',
										type: 'string',
										displayOptions: {
											show: {
												'/mode': [
													'mode2'
												],
											},
										},
										default: 'default string1',
									},
									{
										name: 'number1',
										displayName: 'number1',
										type: 'number',
										default: 0,
									},
								],
							},
						],
						nodeValues: {
							values: [
								{
									string1: 'own string1',
									number1: 0,
								}
							],
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: [
									{
										string1: 'own string1',
										number1: 0,
									},
								],
							},
							defaultsTrue: {
								mode: 'mode1',
								values: [
									{
										string1: 'own string1',
										number1: 0,
									},
								],
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: [
									{
										string1: 'own string1',
										number1: 0,
									},
								],
							},
							defaultsTrue: {
								mode: 'mode1',
								values: [
									{
										string1: 'own string1',
										number1: 0,
									},
								],
							},
						},
					},
				},
				{
					description: 'complex type "fixedCollection" with "multipleValues: false" and with displayOptions "show" (no-match) on option. One value set also the not displayed one.',
					input: {
						nodePropertiesArray: [
							{
								name: 'values',
								displayName: 'Values',
								type: 'fixedCollection',
								default: {},
								options: [
									{
										name: 'number',
										displayName: 'Number',
										values: [
											{
												name: 'mode',
												displayName: 'mode',
												type: 'string',
												default: 'mode1',
											},
											{
												displayName: 'string1',
												name: 'string1',
												type: 'string',
												displayOptions: {
													show: {
														mode: [
															'mode1'
														],
													},
												},
												default: 'default string1',
											},
											{
												displayName: 'number1',
												name: 'number1',
												type: 'number',
												default: 0,
											},
										],
									},
								],
							},
						],
						nodeValues: {
							values: {
								number: {
									mode: 'mode2',
									string1: 'default string1',
									number1: 1,
								},
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								values: {
									number: {
										mode: 'mode2',
										number1: 1,
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										mode: 'mode2',
										number1: 1,
									},
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								values: {
									number: {
										mode: 'mode2',
										number1: 1,
									},
								},
							},
							defaultsTrue: {
								values: {
									number: {
										mode: 'mode2',
										string1: 'default string1',
										number1: 1,
									},
								},
							},
						},
					},
				},
				{
					description: 'complex type "collection" with "multipleValues: true". One none-default value set.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {
							collection1: [
								{
									string1: 'value1'
								}
							],
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								collection1: [
									{
										string1: 'value1'
									}
								],
							},
							defaultsTrue: {
								collection1: [
									{
										string1: 'value1'
									}
								],
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								collection1: [
									{
										string1: 'value1'
									}
								],
							},
							defaultsTrue: {
								collection1: [
									{
										string1: 'value1'
									}
								],
							},
						},
					},
				},
				// Remember it is correct that default strings get returned here even when returnDefaults
				// is set to false because if they would not, there would be no way to know which value
				// got added and which one not.
				{
					description: 'complex type "collection" with "multipleValues: true". One default value set.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {
							collection1: [
								{
									string1: 'default string1'
								}
							],
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								collection1: [
									{
										string1: 'default string1',
									}
								],
							},
							defaultsTrue: {
								collection1: [
									{
										string1: 'default string1',
									}
								],
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								collection1: [
									{
										string1: 'default string1',
									}
								],
							},
							defaultsTrue: {
								collection1: [
									{
										string1: 'default string1',
									}
								],
							},
						},
					},
				},
				{
					description: 'complex type "collection" with "multipleValues: false". One none-default value set.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {
							collection1: {
								string1: 'own string1',
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								collection1: {
									string1: 'own string1',
								},
							},
							defaultsTrue: {
								collection1: {
									string1: 'own string1',
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								collection1: {
									string1: 'own string1',
								},
							},
							defaultsTrue: {
								collection1: {
									string1: 'own string1',
								},
							},
						},
					},
				},
				{
					description: 'complex type "collection" with "multipleValues: false". One default value set.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {
							collection1: {
								string1: 'default string1',
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								collection1: {
									string1: 'default string1',
								},
							},
							defaultsTrue: {
								collection1: {
									string1: 'default string1',
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								collection1: {
									string1: 'default string1',
								},
							},
							defaultsTrue: {
								collection1: {
									string1: 'default string1',
								},
							},
						},
					},
				},
				{
					description: 'complex type "collection" with "multipleValues: false". Only outer value set.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {
							collection1: {
							},
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								collection1: {
								},
							},
							defaultsTrue: {
								collection1: {
								},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								collection1: {
								},
							},
							defaultsTrue: {
								collection1: {
								},
							},
						},
					},
				},
				{
					description: 'complex type "collection" with "multipleValues: false". No value set at all.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {},
							defaultsTrue: {
								collection1: {},
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {},
							defaultsTrue: {
								collection1: {},
							},
						},
					},
				},
				{
					description: 'complex type "collection" with "multipleValues: true". No value set at all.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'collection1',
								name: 'collection1',
								type: 'collection',
								typeOptions: {
									multipleValues: true,
								},
								default: {},
								options: [
									{
										displayName: 'string1',
										name: 'string1',
										type: 'string',
										default: 'default string1',
									},
									{
										displayName: 'string2',
										name: 'string2',
										type: 'string',
										default: 'default string2',
									},
								],
							},
						],
						nodeValues: {},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								// collection1: [],
							},
							defaultsTrue: {
								collection1: [],
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								// collection1: [],
							},
							defaultsTrue: {
								collection1: [],
							},
						},
					},
				},
				{
					description: 'two identically named properties of which only one gets displayed with different options. No value set at all.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'mainOption',
								name: 'mainOption',
								type: 'options',
								options: [
									{
										name: 'option1',
										value: 'option1',
									},
									{
										name: 'option2',
										value: 'option2',
									},
								],
								default: 'option1',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
									},
								},
								options: [
									{
										name: 'option1a',
										value: 'option1a',
									},
									{
										name: 'option1b',
										value: 'option1b',
									},
								],
								default: 'option1a',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
									},
								},
								options: [
									{
										name: 'option2a',
										value: 'option2a',
									},
									{
										name: 'option2b',
										value: 'option2b',
									},
								],
								default: 'option2a',
							},
						],
						nodeValues: {},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mainOption: 'option1',
								subOption: 'option1a',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mainOption: 'option1',
								subOption: 'option1a',
							},
						},
					},
				},
				{
					description: 'One property which is dependeny on two identically named properties of which only one gets displayed with different options. No value set at all.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'mainOption',
								name: 'mainOption',
								type: 'options',
								options: [
									{
										name: 'option1',
										value: 'option1',
									},
									{
										name: 'option2',
										value: 'option2',
									},
								],
								default: 'option1',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
									},
								},
								options: [
									{
										name: 'option1a',
										value: 'option1a',
									},
									{
										name: 'option1b',
										value: 'option1b',
									},
								],
								default: 'option1a',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
									},
								},
								options: [
									{
										name: 'option2a',
										value: 'option2a',
									},
									{
										name: 'option2b',
										value: 'option2b',
									},
								],
								default: 'option2a',
							},
							{
								displayName: 'dependentParameter',
								name: 'dependentParameter',
								type: 'string',
								default: 'value1',
								required: true,
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
										subOption: [
											'option1a',
										],
									},
								},
							},
							{
								displayName: 'dependentParameter',
								name: 'dependentParameter',
								type: 'string',
								default: 'value2',
								required: true,
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
										subOption: [
											'option2a',
										],
									},
								},
							},
						],
						nodeValues: {},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mainOption: 'option1',
								subOption: 'option1a',
								dependentParameter: 'value1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mainOption: 'option1',
								subOption: 'option1a',
								dependentParameter: 'value1',
							},
						},
					},
				},
				{
					description: 'One property which is dependeny on two identically named properties of which only one gets displayed with different options. No value set at all. Order reversed',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'dependentParameter',
								name: 'dependentParameter',
								type: 'string',
								default: 'value2',
								required: true,
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
										subOption: [
											'option2a',
										],
									},
								},
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
									},
								},
								options: [
									{
										name: 'option2a',
										value: 'option2a',
									},
									{
										name: 'option2b',
										value: 'option2b',
									},
								],
								default: 'option2a',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
									},
								},
								options: [
									{
										name: 'option1a',
										value: 'option1a',
									},
									{
										name: 'option1b',
										value: 'option1b',
									},
								],
								default: 'option1a',
							},
							{
								displayName: 'dependentParameter',
								name: 'dependentParameter',
								type: 'string',
								default: 'value1',
								required: true,
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
										subOption: [
											'option1a',
										],
									},
								},
							},
							{
								displayName: 'mainOption',
								name: 'mainOption',
								type: 'options',
								options: [
									{
										name: 'option1',
										value: 'option1',
									},
									{
										name: 'option2',
										value: 'option2',
									},
								],
								default: 'option1',
							},
						],
						nodeValues: {},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mainOption: 'option1',
								subOption: 'option1a',
								dependentParameter: 'value1',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
							},
							defaultsTrue: {
								mainOption: 'option1',
								subOption: 'option1a',
								dependentParameter: 'value1',
							},
						},
					},
				},
				{
					description: 'One property which is dependeny on two identically named properties of which only one gets displayed with different options. No value set at all.',
					input: {
						nodePropertiesArray: [
							{
								displayName: 'mainOption',
								name: 'mainOption',
								type: 'options',
								options: [
									{
										name: 'option1',
										value: 'option1',
									},
									{
										name: 'option2',
										value: 'option2',
									},
								],
								default: 'option1',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
									},
								},
								options: [
									{
										name: 'option1a',
										value: 'option1a',
									},
									{
										name: 'option1b',
										value: 'option1b',
									},
								],
								default: 'option1a',
							},
							{
								displayName: 'subOption',
								name: 'subOption',
								type: 'options',
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
									},
								},
								options: [
									{
										name: 'option2a',
										value: 'option2a',
									},
									{
										name: 'option2b',
										value: 'option2b',
									},
								],
								default: 'option2a',
							},
							{
								displayName: 'dependentParameter',
								name: 'dependentParameter',
								type: 'string',
								default: 'value1',
								required: true,
								displayOptions: {
									show: {
										mainOption: [
											'option1',
										],
										subOption: [
											'option1a',
										],
									},
								},
							},
							{
								displayName: 'dependentParameter',
								name: 'dependentParameter',
								type: 'string',
								default: 'value2',
								required: true,
								displayOptions: {
									show: {
										mainOption: [
											'option2',
										],
										subOption: [
											'option2a',
										],
									},
								},
							},
						],
						nodeValues: {
							mainOption: 'option2'
						},
					},
					output: {
						noneDisplayedFalse: {
							defaultsFalse: {
								mainOption: 'option2',
							},
							defaultsTrue: {
								mainOption: 'option2',
								subOption: 'option2a',
								dependentParameter: 'value2',
							},
						},
						noneDisplayedTrue: {
							defaultsFalse: {
								mainOption: 'option2',
							},
							defaultsTrue: {
								mainOption: 'option2',
								subOption: 'option2a',
								dependentParameter: 'value2',
							},
						},
					},
				},
			];


		for (const testData of tests) {
			test(testData.description, () => {

				// returnDefaults: false | returnNoneDisplayed: false
				let result = NodeHelpers.getNodeParameters(testData.input.nodePropertiesArray, testData.input.nodeValues, false, false);
				expect(result).toEqual(testData.output.noneDisplayedFalse.defaultsFalse);

				// returnDefaults: true | returnNoneDisplayed: false
				result = NodeHelpers.getNodeParameters(testData.input.nodePropertiesArray, testData.input.nodeValues, true, false);
				expect(result).toEqual(testData.output.noneDisplayedFalse.defaultsTrue);

				// returnDefaults: false | returnNoneDisplayed: true
				result = NodeHelpers.getNodeParameters(testData.input.nodePropertiesArray, testData.input.nodeValues, false, true);
				expect(result).toEqual(testData.output.noneDisplayedTrue.defaultsFalse);

				// returnDefaults: true | returnNoneDisplayed: true
				result = NodeHelpers.getNodeParameters(testData.input.nodePropertiesArray, testData.input.nodeValues, true, true);
				expect(result).toEqual(testData.output.noneDisplayedTrue.defaultsTrue);
			});
		}

	});
});
