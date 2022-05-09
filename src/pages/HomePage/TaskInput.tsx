import React, { ChangeEvent, useState } from 'react'

const TaskInput = () => {
    const [taskName, setTaskname] = useState<string>("");
    const handleTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskname(e.target.value)
    }
    return (
        <input type="text" className="form-control" placeholder="Create your first task" id="addtaskinput" accessKey="t" onChange={handleTaskName} value={taskName} />
    )
}

export default TaskInput