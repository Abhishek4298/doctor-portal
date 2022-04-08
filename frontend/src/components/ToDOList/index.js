import { useState } from "react";

const ToDOList = () => {
    let getFromLocalStorage = JSON.parse(localStorage.getItem('AddTaskData'))
    const [addText, setAddText] = useState()
    let taskList = []
    const addTask = (e) => {
        e.preventDefault();
        if (getFromLocalStorage) {
            taskList = getFromLocalStorage
        }
        const formData = addText;
        taskList.push(formData)
        localStorage.setItem('AddTaskData', JSON.stringify(taskList));
        setAddText("")
    }
    const deleteTask = (task) => {
        const deletedData = getFromLocalStorage.filter((el) => {
            return task !== el
        });
        localStorage.setItem('AddTaskData', JSON.stringify(deletedData));
    }
    const editTask = (task) => {
        alert("EDIT")
    }
    const onChange = (e) => {
        e.preventDefault();
        setAddText(e.target.value)
    }
    return (<>
        <div className="container d-flex justify-content-center">
            <div className="row">
                <h2>TO-DO List</h2>
                <div className="form-floating d-flex justify-content-center">
                    <textarea
                        className="form-control"
                        id="floatingTextarea"
                        value={addText}
                        onChange={onChange}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Add Task</label>
                    <button type="button" onClick={addTask} className="btn btn-primary">Add Task</button>
                </div>
                <div className="mt-4">
                    {
                        getFromLocalStorage &&
                        <>
                            <h4>List of Task</h4>
                            {getFromLocalStorage.map((elem, id) => {
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
                        </>
                    }

                </div>
            </div>
        </div>
    </>);
}

export default ToDOList;