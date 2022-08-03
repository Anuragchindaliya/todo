import { createContext, } from "react";
import { initialTodoState, initialTodoStateType } from "./todoReducer";
export const TodoContext = createContext<initialTodoStateType>(initialTodoState);





