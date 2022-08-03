import React, { useContext, useEffect, useRef, useState } from 'react'
import { todoAddAction, todoCancelEdit, todoDeleteAllAction, todoEditUpdate } from '../../context/todoAction';
import { TodoContext } from '../../context/todoContext';
const FormInput = () => {
    const { dispatch, edit } = useContext(TodoContext);
    const initialState: string = edit.mode ? edit.taskName : "";
    const [taskName, setTaskname] = useState<string>(initialState);
    const [isTaskNameChanged, setTaskNameChanged] = useState(false);
    const [isError, setError] = useState<string>("");
    const handleTaskName = (e: React.FormEvent<HTMLInputElement>) => {
        setTaskname(e.currentTarget.value);
        isTaskNameChanged === false && setTaskNameChanged(true)
        isError !== "" && setError("")
    }
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskName === "") {
            setError("Please Type Task Name")
            return;
        }
        if (edit.id) {
            dispatch(todoEditUpdate({ id: edit.id, taskName }))
        } else {
            dispatch(todoAddAction(taskName))
        }
        setTaskname("");
        setError("")
    }
    const deleteAllTasks = () => {
        dispatch(todoDeleteAllAction())
    }
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (edit.mode) {
            setTaskname(edit.taskName);
            if (inputRef) {
                inputRef.current?.focus();
            }
        }
    }, [edit])
    const cancelSave = () => {
        // console.log("cancel save")
        dispatch(todoCancelEdit());
        setTaskname("")
    }
    return (
        <form className="form-row" onSubmit={handleFormSubmit}>
            <div className="col-md-8 col-sm-12  bd-search">
                <input ref={inputRef} type="text" className="form-control" placeholder="Create your first task" accessKey="t" onChange={handleTaskName} value={taskName} />
                {isError && <div className='text-danger'>{isError}</div>}
            </div>
            <div className="col-md-4 col-sm-6 btnq">
                {edit.mode ?
                    <>
                        <button type="submit" style={{ cursor: isTaskNameChanged ? "" : `not-allowed` }} className={`btn btn-outline-${isTaskNameChanged ? "success" : "secondary"} mr-2 disabled`} disabled={!isTaskNameChanged}
                            title={isTaskNameChanged ? "Save Task" : "Change Task Name"}
                        >
                            Save Task
                        </button>
                        <button className='btn btn-outline-danger' onClick={cancelSave}>cancel</button>
                    </>
                    :
                    <>
                        <button type="submit" className="btn btn-outline-success mr-2" >
                            Add Task
                        </button>
                        <button onClick={deleteAllTasks} type="button" className="btn btn-outline-danger">
                            Delete All
                        </button>
                    </>
                }


            </div>
        </form>
    )
}
export default  FormInput;