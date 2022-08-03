import { TODO_ADD, TODO_CANCEL_EDIT, TODO_DELETE_ALL, TODO_DELETE_SINGLE, TODO_EDIT_MODE, TODO_HANDLE_STATUS, TODO_SEARCH, TODO_UPDATE } from "../interfaces"
import { editType } from "./todoReducer"

export const todoAddAction = (val: string) => {
    return {
        type: TODO_ADD,
        payload: val
    }
}
export const todoHandleStatusAction = (id: number) => {
    return {
        type: TODO_HANDLE_STATUS,
        payload: id
    }
}

export const todoDeleteAllAction = () => {
    return {
        type: TODO_DELETE_ALL
    }
}
export const todoEditMode = (val: editType) => {
    return {
        type: TODO_EDIT_MODE,
        payload: val
    }
}
interface editSaveType {
    id: number;
    taskName: string;
}
export const todoEditUpdate = (val: editSaveType) => {
    return {
        type: TODO_UPDATE,
        payload: val
    }
}
export const todoDeleteSingleAction = (id: number) => {
    return {
        type: TODO_DELETE_SINGLE,
        payload: id
    }
}
export const todoSearch = (payload: string) => {
    return {
        type: TODO_SEARCH,
        payload
    }
}
export const todoCancelEdit = () => {
    return {
        type: TODO_CANCEL_EDIT
    }
}

