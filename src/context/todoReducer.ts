import { ITask, TODO_ADD, TODO_CANCEL_EDIT, TODO_DELETE_ALL, TODO_DELETE_SINGLE, TODO_EDIT_MODE, TODO_HANDLE_STATUS, TODO_SEARCH, TODO_UPDATE } from "../interfaces";
import { getDataFromLocalStorage } from "../utils";
// import { Action } from "./todoAction";

export type editType = {
    id: number | null;
    mode?: boolean;
    taskName: string;
}
export interface initialTodoStateType {
    todos: ITask[],
    edit: editType,
    dispatch: React.Dispatch<any>,
    searchTerm: string;
}

export const initialTodoState: initialTodoStateType = {

    todos: getDataFromLocalStorage("tasks"),
    edit: { id: null, mode: false, taskName: "" },
    dispatch: () => { },
    searchTerm: ""
}


// type Reducer<State, Action> = (state: State, action: Action);
export const todoReducer = (state: initialTodoStateType, action: any): initialTodoStateType => {
    const { type, payload } = action;
    const { todos } = state;
    switch (type) {
        case TODO_ADD: {
            const newTask: ITask = {
                id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
                taskName: payload,
                completeStatus: false,
                time: new Date()
            }
            return {
                ...state,
                todos: [...todos, newTask]
            }
        }
        case TODO_UPDATE: {
            const { id, taskName } = payload;
            const newData = todos.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        taskName
                    }
                }
                return task
            })
            return { ...state, todos: newData, edit: initialTodoState.edit }
        }
        case TODO_DELETE_SINGLE: {
            return {
                ...state,
                todos: todos.filter((task) => task.id !== payload)
            }
        }
        case TODO_HANDLE_STATUS: {
            const newData = todos.map((task) => {
                if (task.id === payload) {
                    return {
                        ...task,
                        "completeStatus": !task.completeStatus
                    }
                }
                return task
            });
            return {
                ...state,
                todos: newData
            }

        }
        case TODO_DELETE_ALL:
            return { ...state, todos: [] };
        case TODO_EDIT_MODE:
            const { id, taskName } = payload
            return {
                ...state,
                edit: { id, taskName, mode: true }
            }
        case TODO_SEARCH:
            return {
                ...state,
                searchTerm: payload
            }
        case TODO_CANCEL_EDIT:
            return {
                ...state,
                edit: initialTodoState.edit
            }
        default:
            return initialTodoState;
    }
}