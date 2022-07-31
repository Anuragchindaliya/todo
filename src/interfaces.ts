export interface ITask {
    id: number;
    taskName: string;
    completeStatus: boolean;
    time: Date | string;
}