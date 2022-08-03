export interface ITask {
    id: number;
    taskName: string;
    completeStatus: boolean;
    time: Date | string;
}
export interface EditTaskData {
    id: number | null;
    name: string | undefined;
}
// change to enum soon
export const TODO_ADD = "TODO_ADD";
export const TODO_UPDATE = "TODO_UPDATE";
export const TODO_DELETE_SINGLE = "TODO_DELETE_SINGLE";
export const TODO_HANDLE_STATUS = "TODO_HANDLE_STATUS"
export const TODO_DELETE_ALL = "TODO_DELETE_ALL"
export const TODO_EDIT_MODE = "TODO_EDIT_MODE";
export const TODO_SEARCH = "TODO_SEARCH";
export const TODO_CANCEL_EDIT = "TODO_CANCEL_EDIT";