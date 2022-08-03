import React, { useEffect, useReducer } from "react"
import { TodoContext } from "./todoContext"
import { initialTodoState, todoReducer } from "./todoReducer"
interface TodoProviderType {
    children: React.ReactNode
}

export const TodoProvider = ({ children }: TodoProviderType) => {
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    useEffect(() => {
        // console.log(state, "latest todos from reducer")
        localStorage.setItem("tasks", JSON.stringify(state.todos))
    }, [state])
    return <TodoContext.Provider value={{ ...state, dispatch }}>
        {children}
    </TodoContext.Provider>
}
