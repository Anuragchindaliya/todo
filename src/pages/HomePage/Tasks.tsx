import React, { memo } from 'react'
import Task from '../../components/Task'
import { ITask } from '../../interfaces'
type IProps = {
    tasks: ITask[];
    deleteTask: Function;
    handleCompleteStatus: Function;
    editTask: Function
}
const Tasks = ({ tasks, deleteTask, handleCompleteStatus, editTask }: IProps) => {
    console.count("-tasks")
    return (
        <table className="table table-striped table-hover mt-3 mb-0" id="addedtasklist">
            <tbody>
                {tasks.length > 0 ? tasks.map((task: ITask, i) => (
                    <Task key={task.id} index={i + 1} task={task} deleteTask={deleteTask} handleCompleteStatus={handleCompleteStatus} editTask={editTask} />
                )) :
                    <tr><td className='text-center'>No Task</td></tr>
                }
            </tbody>
        </table>
    )
}

export default memo(Tasks)