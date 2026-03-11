import { TaskStatus } from "./enums/taskStatus";

export interface Task {
    id?: number;
    title: string;
    description: string,
    status: TaskStatus
    deadLine: string,
    userId: number;
    createdAt?: Date;
}