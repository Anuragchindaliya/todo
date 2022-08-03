import { useContext } from 'react'
import Task from '../../components/Task'
import { TodoContext } from '../../context/todoContext';
import { ITask } from '../../interfaces'

const Tasks = () => {
    const { todos, searchTerm } = useContext(TodoContext);
    return (
        <table className="table table-striped table-hover mt-3 mb-0" id="addedtasklist">
            <tbody>
                {todos?.length > 0 ? todos.filter((task) => task.taskName.includes(searchTerm)).map((task: ITask, i) => (
                    <Task key={task.id} index={i + 1} task={task} />
                )) :
                    <tr><td className='text-center'>No Task</td></tr>
                }
            </tbody>
        </table>
    )
}

export default Tasks;