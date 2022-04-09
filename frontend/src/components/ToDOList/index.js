import { useState } from "react";

const ToDOList = () => {
    let getFromLocalStorage = JSON.parse(localStorage.getItem('AddTaskData'))
    const [taskList, setTaskList] = useState(getFromLocalStorage)
    const [input, setInput] = useState("")

    const addTask = (e) => {
        let list = [];
        e.preventDefault();
        if (getFromLocalStorage) {
            list = getFromLocalStorage
        }
        list.push(input)
        setTaskList(list)
        localStorage.setItem('AddTaskData', JSON.stringify(list));
    }
    const deleteTask = (task) => {
        const deletedData = taskList.filter((el) => {
            return task !== el
        });
        localStorage.setItem('AddTaskData', JSON.stringify(deletedData));
        setTaskList(deletedData);
    }
    const editTask = (task) => {
        alert("EDIT")
    }
    const onChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }
    return (<>
        <div className="container d-flex justify-content-center">
            <div className="row">
                <h2>TO-DO List</h2>
                <div className="form-floating d-flex justify-content-center">
                    <textarea
                        className="form-control"
                        id="floatingTextarea"
                        value={input}
                        onChange={onChange}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Add Task</label>
                    <button type="button" onClick={addTask} className="btn btn-primary">Add Task</button>
                </div>
                <div className="mt-4">
                    {
                        (taskList?.length) ?
                            <>
                                <h4>List of Task</h4>
                                {taskList.map((elem, id) => {
                                    return (
                                        <div className="d-flex justify-content-start" key={id}>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <div className="mx-2 card w-75" style={{ width: "18rem" }}>
                                                <h5 className="mx-4">{elem}</h5>
                                            </div>
                                            <div className="mx-3">
                                                <i className="fa fa-pencil-square-o"
                                                    onClick={() => editTask(elem)}
                                                    aria-hidden="true" disabled></i>
                                                <i
                                                    onClick={() => deleteTask(elem)}
                                                    className="fa fa-trash-o"
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                        </div>
                                    )
                                })}
                            </> :
                            <p>No task</p>
                    }
                </div>
            </div>
        </div>
    </>);
}

export default ToDOList;