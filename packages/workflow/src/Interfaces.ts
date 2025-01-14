import { Workflow } from './Workflow';
import * as express from "express";

export interface IBinaryData {
	[key: string]: string | undefined;
	data: string;
	mimeType: string;
	fileName?: string;
	fileExtension?: string;
}


export interface IConnection {
	// The node the connection is to
	node: string;

	// The type of the input on destination node (for example "main")
	type: string;

	// The output/input-index of destination node (if node has multiple inputs/outputs of the same type)
	index: number;
}

export interface IExecutionError {
	message: string;
	node?: string;
	stack?: string;
}

// Get used to gives nodes access to credentials
export interface IGetCredentials {
	get(type: string, name: string): Promise<ICredentialsEncrypted>;
}

// Defines which nodes are allowed to access the credentials and
// when that access got grented from which user
export interface ICredentialNodeAccess {
	nodeType: string;
	user?: string;
	date?: Date;
}

export interface ICredentialsDecrypted {
	name: string;
	type: string;
	nodesAccess: ICredentialNodeAccess[];
	data?: ICredentialDataDecryptedObject;
}

export interface ICredentialsEncrypted {
	name: string;
	type: string;
	nodesAccess: ICredentialNodeAccess[];
	data?: string;
}

export interface ICredentialType {
	name: string;
	displayName: string;
	properties: INodeProperties[];
}

export interface ICredentialTypes {
	credentialTypes?: {
		[key: string]: ICredentialType
	};
	init(credentialTypes?: { [key: string]: ICredentialType }): Promise<void>;
	getAll(): ICredentialType[];
	getByName(credentialType: string): ICredentialType;
}

// The way the credentials get saved in the database (data encrypted)
export interface ICredentialData {
	name: string;
	data: string; // Contains the access data as encrypted JSON string
	nodesAccess: ICredentialNodeAccess[];
}

// The encrypted credentials which the nodes can access
export type CredentialInformation = string | number | boolean;


// The encrypted credentials which the nodes can access
export interface ICredentialDataDecryptedObject {
	[key: string]: CredentialInformation;
}

// First array index: The output/input-index (if node has multiple inputs/outputs of the same type)
// Second array index: The different connections (if one node is connected to multiple nodes)
export type NodeInputConnections = IConnection[][];

export interface INodeConnections {
	// Input name
	[key: string]: NodeInputConnections;
}

export interface IConnections {
	// Node name
	[key: string]: INodeConnections;
}

export type GenericValue = string | object | number | boolean | undefined | null;

export interface IDataObject {
	[key: string]: GenericValue | IDataObject | GenericValue[] | IDataObject[];
}


export interface IGetExecuteTriggerFunctions {
	(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode): ITriggerFunctions;
}


export interface IGetExecuteFunctions {
	(workflow: Workflow, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode): IExecuteFunctions;
}


export interface IGetExecuteSingleFunctions {
	(workflow: Workflow, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, node: INode, itemIndex: number, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode): IExecuteSingleFunctions;
}


export interface IGetExecuteHookFunctions {
	(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, isTest?: boolean, webhookData?: IWebhookData): IHookFunctions;
}


export interface IGetExecuteWebhookFunctions {
	(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, webhookData: IWebhookData): IWebhookFunctions;
}


export interface IExecuteData {
	data: ITaskDataConnections;
	node: INode;
}


export type IContextObject = {
	[key: string]: any; // tslint:disable-line:no-any
};


export interface IExecuteContextData {
	// Keys are: "flow" | "node:<NODE_NAME>"
	[key: string]: IContextObject;
}


export interface IExecuteFunctions {
	getContext(type: string): IContextObject;
	getCredentials(type: string): ICredentialDataDecryptedObject | undefined;
	getInputData(inputIndex?: number, inputName?: string): INodeExecutionData[];
	getMode(): WorkflowExecuteMode;
	getNodeParameter(parameterName: string, itemIndex: number, fallbackValue?: any): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object; //tslint:disable-line:no-any
	getWorkflowStaticData(type: string): IDataObject;
	getTimezone(): string;
	prepareOutputData(outputData: INodeExecutionData[], outputIndex?: number): Promise<INodeExecutionData[][]>;
	helpers: {
		[key: string]: (...args: any[]) => any //tslint:disable-line:no-any
	};
}


export interface IExecuteSingleFunctions {
	getContext(type: string): IContextObject;
	getCredentials(type: string): ICredentialDataDecryptedObject | undefined;
	getInputData(inputIndex?: number, inputName?: string): INodeExecutionData;
	getMode(): WorkflowExecuteMode;
	getNodeParameter(parameterName: string, fallbackValue?: any): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object; //tslint:disable-line:no-any
	getTimezone(): string;
	getWorkflowStaticData(type: string): IDataObject;
	helpers: {
		[key: string]: (...args: any[]) => any //tslint:disable-line:no-any
	};
}

export interface ILoadOptionsFunctions {
	getCredentials(type: string): ICredentialDataDecryptedObject | undefined;
	getNodeParameter(parameterName: string, fallbackValue?: any): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object; //tslint:disable-line:no-any
	getTimezone(): string;
	helpers: {
		[key: string]: ((...args: any[]) => any) | undefined; //tslint:disable-line:no-any
	};
}

export interface IHookFunctions {
	getCredentials(type: string): ICredentialDataDecryptedObject | undefined;
	getMode(): WorkflowExecuteMode;
	getNodeWebhookUrl: (name: string) => string | undefined;
	getNodeParameter(parameterName: string, fallbackValue?: any): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object; //tslint:disable-line:no-any
	getTimezone(): string;
	getWebhookDescription(name: string): IWebhookDescription | undefined;
	getWebhookName(): string;
	getWorkflowStaticData(type: string): IDataObject;
	helpers: {
		[key: string]: (...args: any[]) => any //tslint:disable-line:no-any
	};
}

export interface ITriggerFunctions {
	emit(data: INodeExecutionData[][]): void;
	getCredentials(type: string): ICredentialDataDecryptedObject | undefined;
	getMode(): WorkflowExecuteMode;
	getNodeParameter(parameterName: string, fallbackValue?: any): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object; //tslint:disable-line:no-any
	getTimezone(): string;
	getWorkflowStaticData(type: string): IDataObject;
	helpers: {
		[key: string]: (...args: any[]) => any //tslint:disable-line:no-any
	};
}

export interface IWebhookFunctions {
	getBodyData(): IDataObject;
	getCredentials(type: string): ICredentialDataDecryptedObject | undefined;
	getHeaderData(): object;
	getMode(): WorkflowExecuteMode;
	getNodeParameter(parameterName: string, fallbackValue?: any): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | object; //tslint:disable-line:no-any
	getNodeWebhookUrl: (name: string) => string | undefined;
	getQueryData(): object;
	getRequestObject(): express.Request;
	getResponseObject(): express.Response;
	getTimezone(): string;
	getWebhookName(): string;
	getWorkflowStaticData(type: string): IDataObject;
	prepareOutputData(outputData: INodeExecutionData[], outputIndex?: number): Promise<INodeExecutionData[][]>;
	helpers: {
		[key: string]: (...args: any[]) => any //tslint:disable-line:no-any
	};
}

export interface INodeCredentials {
	[key: string]: string;
}

export interface INode {
	name: string;
	typeVersion: number;
	type: string;
	position: [number, number];
	disabled?: boolean;
	retryOnFail?: boolean;
	maxTries?: number;
	waitBetweenTries?: number;
	continueOnFail?: boolean;
	parameters: INodeParameters;
	credentials?: INodeCredentials;
}


export interface INodes {
	[key: string]: INode;
}


export interface IObservableObject {
	[key: string]: any; // tslint:disable-line:no-any
	__dataChanged: boolean;
}


export interface IBinaryKeyData {
	[key: string]: IBinaryData;
}

export interface INodeExecutionData {
	[key: string]: IDataObject | IBinaryKeyData | undefined;
	// TODO: Rename this one as json does not really fit as it is not json (which is a string) it is actually a JS object
	json: IDataObject;
	// json: object;
	// json?: object;
	binary?: IBinaryKeyData;
}


export interface INodeExecuteFunctions {
	getExecuteTriggerFunctions: IGetExecuteTriggerFunctions;
	getExecuteFunctions: IGetExecuteFunctions;
	getExecuteSingleFunctions: IGetExecuteSingleFunctions;
	getExecuteHookFunctions: IGetExecuteHookFunctions;
	getExecuteWebhookFunctions: IGetExecuteWebhookFunctions;
}


// The values a node property can have
export type NodeParameterValue = string | number | boolean;

export interface INodeParameters {
	// TODO: Later also has to be possible to add multiple ones with the name name. So array has to be possible
	[key: string]: NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[];
}


export type NodePropertyTypes = 'boolean' | 'collection' | 'color' | 'dateTime' | 'fixedCollection' | 'json' | 'multiOptions' | 'number' | 'options' | 'string';

export interface INodePropertyTypeOptions {
	alwaysOpenEditWindow?: boolean; // Supported by: string
	loadOptionsMethod?: string;  // Supported by: options
	maxValue?: number;           // Supported by: number
	minValue?: number;           // Supported by: number
	multipleValues?: boolean;    // Supported by: <All>
	multipleValueButtonText?: string;    // Supported when "multipleValues" set to true
	numberPrecision?: number;    // Supported by: number
	numberStepSize?: number;     // Supported by: number
	password?: boolean;          // Supported by: string
	rows?: number;               // Supported by: string
	[key: string]: boolean | number | string | undefined;
}

export interface IDisplayOptions {
	hide?: {
		[key: string]: NodeParameterValue[];
	};
	show?: {
		[key: string]: NodeParameterValue[];
	};
}


export interface INodeProperties {
	displayName: string;
	name: string;
	type: NodePropertyTypes;
	typeOptions?: INodePropertyTypeOptions;
	default: NodeParameterValue | INodeParameters | INodeParameters[] | NodeParameterValue[];
	description?: string;
	displayOptions?: IDisplayOptions;
	options?: Array<INodePropertyOptions | INodeProperties | INodePropertyCollection >;
	placeholder?: string;
	isNodeSetting?: boolean;
	noDataExpression?: boolean;
	required?: boolean;
}


export interface INodePropertyOptions {
	name: string;
	value: string;
	description?: string;
}

export interface INodePropertyCollection {
	displayName: string;
	name: string;
	values: INodeProperties[];
}

export interface IParameterDependencies {
	[key: string]: string[];
}

export interface ITriggerResponse {
	closeFunction?: () => Promise<void>;
	// To manually trigger the run
	manualTriggerFunction?: () => Promise<void>;
	// Gets added automatically at manual workflow runs resolves with
	// the first emitted data
	manualTriggerResponse?: Promise<INodeExecutionData[][]>;
}

export interface INodeType {
	description: INodeTypeDescription;
	execute?(this: IExecuteFunctions): Promise<INodeExecutionData[][] | null>;
	executeSingle?(this: IExecuteSingleFunctions): Promise<INodeExecutionData>;
	trigger?(this: ITriggerFunctions): Promise<ITriggerResponse | undefined>;
	webhook?(this: IWebhookFunctions): Promise<IWebhookResonseData>;
	hooks?: {
		[key: string]: (this: IHookFunctions) => Promise<boolean>;
	};
	methods?: {
		loadOptions?: {
			[key: string]: (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]>;
		}
	};
	webhookMethods?: {
		[key: string]: IWebhookSetupMethods;
	};
}

export type WebhookSetupMethodNames = 'checkExists' | 'create' | 'delete';


export interface IWebhookSetupMethods {
	[key: string]: ((this: IHookFunctions) => Promise<boolean>) | undefined;
	checkExists?: (this: IHookFunctions) => Promise<boolean>;
	create?: (this: IHookFunctions) => Promise<boolean>;
	delete?: (this: IHookFunctions) => Promise<boolean>;
}


export interface INodeCredentialDescription {
	name: string;
	required?: boolean;
	displayOptions?: IDisplayOptions;
}

export type INodeIssueTypes = 'credentials' | 'execution' | 'parameters' | 'typeUnknown';

export interface INodeIssueObjectProperty {
	[key: string]: string[];
}

export interface INodeIssueData {
	node: string;
	type: INodeIssueTypes;
	value: boolean | string | string[] | INodeIssueObjectProperty;
}

export interface INodeIssues {
	execution?: boolean;
	credentials?: INodeIssueObjectProperty;
	parameters?: INodeIssueObjectProperty;
	typeUnknown?: boolean;
	[key: string]: undefined | boolean | INodeIssueObjectProperty;
}

export interface IWorfklowIssues {
	[key: string]: INodeIssues;
}

export interface INodeTypeDescription {
	displayName: string;
	name: string;
	icon?: string;
	group: string[];
	version: number;
	description: string;
	defaults: INodeParameters;
	inputs: string[];
	inputNames?: string[];
	outputs: string[];
	outputNames?: string[];
	properties: INodeProperties[];
	credentials?: INodeCredentialDescription[];
	maxNodes?: number; // How many nodes of that type can be created in a workflow
	subtitle?: string;
	hooks?: {
		[key: string]: INodeHookDescription[] | undefined;
		activate?: INodeHookDescription[];
		deactivate?: INodeHookDescription[];
	};
	webhooks?: IWebhookDescription[];
}

export interface INodeHookDescription {
	method: string;
}

export interface IWebhookData {
	httpMethod: WebhookHttpMethod;
	node: string;
	path: string;
	webhookDescription: IWebhookDescription;
	workflow: Workflow;
	workflowExecuteAdditionalData: IWorkflowExecuteAdditionalData;
}

export interface IWebhookDescription {
	[key: string]: WebhookHttpMethod | WebhookResponseMode | string | undefined;
	httpMethod: WebhookHttpMethod | string;
	name: string;
	path: string;
	responseBinaryPropertyName?: string;
	reponseMode?: WebhookResponseMode | string;
	reponseData?: WebhookResponseData | string;
}

export type WebhookHttpMethod = 'GET' | 'POST';

export interface IWebhookResonseData {
	workflowData?: INodeExecutionData[][];
	webhookResponse?: any; // tslint:disable-line:no-any
	noWebhookResponse?: boolean;
}

export type WebhookResponseData = 'allEntries' | 'firstEntryJson' | 'firstEntryBinary';
export type WebhookResponseMode = 'onReceived' | 'lastNode';

export interface INodeTypes {
	nodeTypes: INodeTypeData;
	init(nodeTypes?: INodeTypeData): Promise<void>;
	getAll(): INodeType[];
	getByName(nodeType: string): INodeType | undefined;
}


export interface INodeTypeData {
	[key: string]: {
		type: INodeType;
		sourcePath: string;
	};
}

export interface IRun {
	data: IRunExecutionData;
	finished?: boolean;
	mode: WorkflowExecuteMode;
	startedAt: Date;
	stoppedAt: Date;
}


// Contains all the data which is needed to execute a workflow and so also to
// start restart it again after it did fail.
// The RunData, ExecuteData and WaitForExecution contain often the same data.
export interface IRunExecutionData {
	startData?: {
		destinationNode?: string;
		runNodeFilter?: string[];
	};
	resultData: {
		error?: IExecutionError;
		runData: IRunData;
		lastNodeExecuted?: string;
	};
	executionData?: {
		contextData: IExecuteContextData;
		nodeExecutionStack: IExecuteData[];
		waitingExecution: IWaitingForExecution;
	};
}


export interface IRunData {
	// node-name: result-data
	[key: string]: ITaskData[];
}


// The data that gets returned when a node runs
export interface ITaskData {
	startTime: number;
	executionTime: number;
	data?: ITaskDataConnections;
	error?: IExecutionError;
}


// The data for al the different kind of connectons (like main) and all the indexes
export interface ITaskDataConnections {
	// Key for each input type and because there can be multiple inputs of the same type it is an array
	// null is also allowed because if we still need data for a later while executing the workflow set teompoary to null
	// the nodes get as input TaskDataConnections which is identical to this one except that no null is allowed.
	[key: string]: Array<INodeExecutionData[] | null>;
}



// Keeps data while workflow gets executed and allows when provided to restart execution
export interface IWaitingForExecution {
	// Node name
	[key: string]: {
		// Run index
		[key: number]: ITaskDataConnections
	};
}


export interface IWorkflowCredentials {
	// Credential type
	[key: string]: {
		// Name
		[key: string]: ICredentialsEncrypted;
	};
}

export interface IWorkflowExecuteHooks {
	[key: string]: Array<((...args: any[]) => Promise<void>)> | undefined; // tslint:disable-line:no-any
	nodeExecuteAfter?: Array<((nodeName: string, data: ITaskData) => Promise<void>)>;
	nodeExecuteBefore?: Array<((nodeName: string) => Promise<void>)>;
	workflowExecuteAfter?: Array<((data: IRun, newStaticData: IDataObject) => Promise<void>)>;
	workflowExecuteBefore?: Array<(() => Promise<void>)>;
}

export interface IWorkflowExecuteAdditionalData {
	credentials: IWorkflowCredentials;
	encryptionKey: string;
	hooks?: IWorkflowExecuteHooks;
	httpResponse?: express.Response;
	httpRequest?: express.Request;
	timezone: string;
	webhookBaseUrl: string;
	webhookTestBaseUrl: string;
}

export type WorkflowExecuteMode = 'cli' | 'error' | 'internal' | 'manual' | 'retry' | 'trigger' | 'webhook';

export interface IWorkflowSettings {
	[key: string]: IDataObject | string | number | boolean | undefined;
}
