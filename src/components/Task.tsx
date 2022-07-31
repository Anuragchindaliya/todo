import moment from "moment";
import { ITask } from "../interfaces"

interface IProps {
    task: ITask;
    deleteTask: Function;
    handleCompleteStatus: Function;
    editTask: Function;
    index: number;
}
const Task = ({ task, deleteTask, handleCompleteStatus, editTask, index }: IProps) => {
    const { id, taskName, completeStatus, time } = task;

    console.count("--- task render")
    return (
        <tr>
            <td scope="row"><span className="idex">{index}</span></td>
            <td className={completeStatus ? "completed" : ""}>{taskName}</td>
            <td>
                <button test-statusbtn="statusBtn" type="button"
                    onClick={() => handleCompleteStatus(task.id)}
                    className={`text-${completeStatus ? "success" : "primary"}`}
                    title={`complete${completeStatus ? "d" : ""}`}>

                    <i className={`fa fa-check-square${completeStatus ? "" : "-o"}`}></i>

                    <span data-csl="completeStatusLabel" className="d-md-inline-block idex ml-2">
                        {completeStatus ? "Done" : "To go"}
                    </span>

                </button>
                {/* {task.completeStatus ? <button type="button" className="text-success fa fa-check-square" style={{ fontSize: '20px' }} id={task.id.toString()} title="completed"><span className="d-md-inline-block idex ml-2" style={{ display: 'none', fontFamily: '"roboto",sans-serif', fontSize: '15px', color: '#28a745', padding: '5px 10px' }}>Done</span></button>
                    :
                    <button type="button" className="text-success fa fa-check-square-o" style={{ color: '#007bff!important', fontSize: '20px' }} id={task.id.toString()} title="complete">
                        <span className="d-md-inline-block idex ml-2" style={{ display: 'none', fontFamily: '"roboto",sans-serif', fontSize: '15px', padding: '5px 10px' }}>To go</span>
                    </button>} */}
            </td>
            <td>
                <button type="button" className="text-primary" title="Edit" onClick={() => editTask(id)}>
                    <i className="fa fa-edit" />
                </button>
            </td>
            <td>
                <button type="button" className="text-danger" title="Delete" onClick={() => deleteTask(id)} accessKey="delete">
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