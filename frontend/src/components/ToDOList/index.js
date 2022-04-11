import { useState } from "react";
import { Modal, Button } from 'react-bootstrap'

const ToDOList = (props) => {
    let getFromLocalStorage = JSON.parse(localStorage.getItem('AddTaskData'))
    const [taskList, setTaskList] = useState(getFromLocalStorage)
    const [input, setInput] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    const [edit, setEdit] = useState("")
    const [show, setShow] = useState(false);
    const [isChecked, SetIsChecked] = useState(false)

    // Modal Edit
    const handleClose = () => setShow(false);
    const handleOpen = (index, task) => {
        setShow(true);
        setEditIndex(index);
        setEdit(task)
    }
    // Add Task
    let list = [];
    const manageTask = (task) => {
        if (!task) {
            // Add
            if (getFromLocalStorage) {
                list = getFromLocalStorage
            }
            if (!input) {
                return props.showAlert("Task can not be null", "info")
            }
            list.push(input)
            setTaskList(list)
            localStorage.setItem('AddTaskData', JSON.stringify(list));
            setInput("")
            return props.showAlert("Task added successfully", "success")
        }
        else {
            //Edit
            const updatedList = [...taskList]
            updatedList[editIndex] = edit;
            setTaskList(updatedList);
            localStorage.setItem('AddTaskData', JSON.stringify(updatedList));
            setEdit("")
            setShow(false)
        }
    }

    // Delete Task
    const deleteTask = (task) => {
        const deletedData = taskList.filter((el) => {
            return task !== el
        });
        localStorage.setItem('AddTaskData', JSON.stringify(deletedData));
        setTaskList(deletedData);
    }

    // check change
    const checkChangeHandler = () => {
        isChecked ? SetIsChecked(false) : SetIsChecked(true);
    }

    let checkEffect;
    if (isChecked) {
        checkEffect = {
            editIcon: {
                opacity: '0.3',
                pointerEvents: 'none'
            },
            editText: {
                textDecoration: 'line-through'
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    return (<>
        <div className="todo-top">
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
                        <button type="button" onClick={() => manageTask()} className="btn btn-primary">Add Task</button>
                    </div>

                    <div className="mt-4">
                        {
                            (taskList?.length) ?
                                <>
                                    <h4>List of Task</h4>
                                    {taskList.map((elem, id) => {
                                        return (
                                            <div className="d-flex justify-content-start" key={id}>
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    name={id}
                                                    value={isChecked}
                                                    onChange={checkChangeHandler}
                                                    id="flexCheckDefault" />
                                                <div className="mx-2 card w-75" style={{ width: "18rem" }}>
                                                    <strong>
                                                        <h5 style={checkEffect?.editText} className="mx-4">{elem}</h5>
                                                    </strong>
                                                </div>
                                                <div className="mx-4d-flex">
                                                    <i
                                                        style={checkEffect?.editIcon}
                                                        className="fa fa-pencil-square-o"
                                                        onClick={() => handleOpen(id, elem)}
                                                        aria-hidden="true"></i>

                                                    {/* Modal for Editing Task */}
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header
                                                            size="lg"
                                                            aria-labelledby="contained-modal-title-vcenter"
                                                            centered="true"
                                                        >
                                                            <Modal.Title>Edit Task</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <textarea
                                                                className="form-control"
                                                                id="floatingTextarea"
                                                                value={edit}
                                                                onChange={(e) => setEdit(e.target.value)}
                                                            ></textarea>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                cancel
                                                            </Button>
                                                            <Button variant="primary" onClick={() => manageTask(elem)}>
                                                                Save
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    {/* Delete Icon For Task */}
                                                    <i
                                                        onClick={() => deleteTask(elem)}
                                                        className="mx-4 fa fa-trash-o"
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
        </div>
    </>);
}

export default ToDOList;