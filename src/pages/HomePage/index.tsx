import { ChangeEvent, FormEvent, memo, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { ITask } from '../../interfaces'
import Tasks from './Tasks';

const HomePage = ({ tasks, setTasks }: { tasks: ITask[], setTasks: Function }) => {

    const [taskName, setTaskname] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isTaskNameChanged, setTaskNameChanged] = useState(false);
    const handleTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskname(e.target.value);
        setTaskNameChanged(true);
    }
    const addTask = () => {
        // e.preventDefault();
        console.log("add task called");
        if (taskName !== "") {
            const newTask = {
                id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
                taskName,
                completeStatus: false,
                time: new Date()
            }
            setTasks((prevTask: ITask[]) => [...prevTask, newTask])
            setTaskname("");
            setErrorMsg("")
        } else {
            setErrorMsg("Enter Task Name")
        }
    }
    const deleteAllTasks = () => {
        setTasks([]);
    }
    const deleteTask = useCallback((id: number) => {
        setTasks((prevTask: ITask[]) => prevTask.filter((task) => task.id !== id))

    }, [])
    const handleCompleteStatus = useCallback((taskId: number) => {
        setTasks((prevTask: ITask[]) => prevTask.map((currentTask) => {
            if (currentTask.id === taskId) {
                return { ...currentTask, completeStatus: !currentTask.completeStatus }
            }
            return currentTask;
        }))
    }, [])
    const editTask = useCallback((id: number) => {
        setEditMode(true);
        const currentTaskName: string | undefined = tasks.find((task) => task.id === id)?.taskName
        currentTaskName && setTaskname(currentTaskName)
        setEditId(id);

    }, [])
    const saveTask = (id: number) => {
        console.log("save task called")
        setTasks((prevTask: ITask[]) => prevTask.map((task) => {
            if (task.id === id) {
                return { ...task, taskName }
            }
            return task;
        }))
        setTaskname("");
        setEditMode(false);

    }
    const cancelSave = () => {
        setTaskname("");
        setEditMode(false);
    }
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form submitted");
        if (editMode) {
            editId && saveTask(editId)
        } else {
            addTask();
        }

    }

    useEffect(() => {
        if (errorMsg !== "") {
            setTimeout(() => setErrorMsg(""), 4000)
        }
    }, [errorMsg])
    console.count("home page render");

    return (
        <section className="todo-outer">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-10">
                        <hr /><h4 className="text-center">Welcome in Todo task List Application</h4><hr />
                        <div className="todo-inner">
                            <form className="form-row" onSubmit={handleFormSubmit}>
                                <div className="col-md-8 col-sm-12  bd-search">
                                    <input type="text" className="form-control" placeholder="Create your first task" accessKey="t" onChange={handleTaskName} value={taskName} />
                                    {errorMsg && <div className='text-danger'>{errorMsg}</div>}
                                </div>
                                <div className="col-md-4 col-sm-6 btnq">
                                    {editMode ?
                                        <>
                                            <button type="submit" style={{ cursor: isTaskNameChanged ? "" : `not-allowed` }} className={`btn btn-outline-${isTaskNameChanged ? "success" : "secondary"} mr-2 disabled`} disabled={!isTaskNameChanged}>
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

                            <div className="to-do-output">
                                <Tasks tasks={tasks} deleteTask={deleteTask} handleCompleteStatus={handleCompleteStatus} editTask={editTask} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(HomePage);