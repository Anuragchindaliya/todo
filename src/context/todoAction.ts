import { TODO_ADD, TODO_CANCEL_EDIT, TODO_DELETE_ALL, TODO_DELETE_SINGLE, TODO_EDIT_MODE, TODO_HANDLE_STATUS, TODO_SEARCH, TODO_UPDATE } from "../interfaces"
import { editType } from "./todoReducer"

type Type = {
    type: string
};
interface ItodoAddAction extends Type {
    payload: string
}
// generics
// interface ActionWithPayload<T> extends Type {
//     payload: T
// }

// export const todoAddActionEx = <T>(val: T): ActionWithPayload<T> => {
//     return {
//         type: TODO_ADD,
//         payload: val
//     }
// }

export const todoAddAction = (val: string): ItodoAddAction => {
    return {
        type: TODO_ADD,
        payload: val
    }
}
interface ItodoHandleStatusAction extends Type {
    payload: number
}
export const todoHandleStatusAction = (id: number): ItodoHandleStatusAction => {
    return {
        type: TODO_HANDLE_STATUS,
        payload: id
    }
}

export const todoDeleteAllAction = (): Type => {
    return {
        type: TODO_DELETE_ALL
    }
}
interface ItodoEditMode extends Type {
    payload: editType
}
export const todoEditMode = (val: editType): ItodoEditMode => {
    return {
        type: TODO_EDIT_MODE,
        payload: val
    }
}
interface editSaveType {
    id: number;
    taskName: string;
}
interface ItodoEditUpdate extends Type {
    payload: editSaveType
}
export const todoEditUpdate = (val: editSaveType): ItodoEditUpdate => {
    return {
        type: TODO_UPDATE,
        payload: val
    }
}
interface ItodoDeleteSingleAction extends Type {
    payload: number
}
export const todoDeleteSingleAction = (id: number): ItodoDeleteSingleAction => {
    return {
        type: TODO_DELETE_SINGLE,
        payload: id
    }
}
interface ItodoSearch extends Type {
    payload: string
}
export const todoSearch = (payload: string): ItodoSearch => {
    return {
        type: TODO_SEARCH,
        payload
    }
}
export const todoCancelEdit = (): Type => {
    return {
        type: TODO_CANCEL_EDIT
    }
}
export type Action = ItodoSearch | ItodoDeleteSingleAction | ItodoEditUpdate | ItodoEditMode | ItodoHandleStatusAction | ItodoAddAction;

