import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Task from "./Task";

let container: Element | null = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
})
afterEach(() => {
    if (container) {
        unmountComponentAtNode(container);
        document.body.removeChild(container)
        container = null;
    }
})
it("render task with name", () => {
    const handleCompleteStatus = jest.fn();
    const task = { "id": 1, "taskName": "anurag", "completeStatus": false, "time": "2022-05-21T17:48:44.540Z" }
    act(() => {
        const deleteTask = jest.fn();
        const editTask = jest.fn();
        const i = 1;
        // render(<Task {...{ task, deleteTask, handleCompleteStatus, editTask, index }} />)
        render(<Task key={task.id} index={i + 1} task={task} />)
    })

    const completeStatusLabel = document.querySelector("[data-csl=completeStatusLabel]")
    expect(completeStatusLabel?.textContent).toBe("To go");

    act(() => {
        const btn = document.querySelector("[test-statusbtn=statusBtn]");
        btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(task.completeStatus).toBe(true);
    expect(handleCompleteStatus).toHaveBeenCalledTimes(1);
    expect(completeStatusLabel?.textContent).toBe("Done")

})
// test("single task to test", () => {
//     console.log("task", Task)

// })