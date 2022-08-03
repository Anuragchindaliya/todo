import moment from "moment";
import { useContext } from "react";
import { todoDeleteSingleAction, todoEditMode, todoHandleStatusAction } from "../context/todoAction";
import { TodoContext } from "../context/todoContext";
import { ITask } from "../interfaces"

interface IProps {
    task: ITask;
    index: number;
}
const Task = ({ task, index }: IProps) => {
    const { id, taskName, completeStatus, time } = task;

    const { dispatch } = useContext(TodoContext);
    const deleteSingleTodo = () => {
        dispatch?.(todoDeleteSingleAction(id));
    }
    const handleCompleteStatus = () => {
        dispatch(todoHandleStatusAction(id))
    }
    const handleEditMode = () => {
        dispatch(todoEditMode({ id, taskName }))
    }
    return (
        <tr>
            <td><span className="idex">{index}</span></td>
            <td className={completeStatus ? "completed" : ""}>{taskName}</td>
            <td>
                <button test-statusbtn="statusBtn" type="button"
                    onClick={handleCompleteStatus}
                    className={`text-${completeStatus ? "success" : "primary"}`}
                    title={`complete${completeStatus ? "d" : ""}`}>

                    <i className={`fa fa-check-square${completeStatus ? "" : "-o"}`}></i>

                    <span data-csl="completeStatusLabel" className="d-md-inline-block idex ml-2">
                        {completeStatus ? "Done" : "To go"}
                    </span>

                </button>

            </td>
            <td>
                <button type="button" className="text-primary" title="Edit" onClick={handleEditMode}>
                    <i className="fa fa-edit" />
                </button>
            </td>
            <td>
                <button type="button" className="text-danger" title="Delete" onClick={deleteSingleTodo} accessKey="delete">
                    <i className="fa fa-trash-o" />
                </button>
            </td>
            <td style={{ color: '#8c8383', fontSize: '12px' }}>
                {moment(new Date(time)).fromNow()}
            </td>
        </tr>
    )
}

export default Task