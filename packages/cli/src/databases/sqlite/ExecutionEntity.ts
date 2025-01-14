import {
	WorkflowExecuteMode,
} from 'n8n-workflow';

import {
	IExecutionFlattedDb,
	IWorkflowDb,
} from '../../';

import {
	Column,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
 } from "typeorm";

import { WorkflowEntity } from './WorkflowEntity';

@Entity()
export class ExecutionEntity implements IExecutionFlattedDb {

	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	data: string;

	@Column()
	finished: boolean;

	@Column()
	mode: WorkflowExecuteMode;

	@Column({ nullable: true })
	retryOf: string;

	@Column({ nullable: true })
	retrySuccessId: string;

	@Column()
	startedAt: Date;

	@Column()
	stoppedAt: Date;

	@Column('simple-json')
	workflowData: IWorkflowDb;

	@Index()
	@Column({ nullable: true })
	workflowId: string;
}
