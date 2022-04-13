import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Modal, Button } from "react-bootstrap";
import "./todolist.css";

const ToDOList = (props) => {
  let getFromLocalStorage = JSON.parse(localStorage.getItem("AddTaskData"));
  const [taskList, setTaskList] = useState(getFromLocalStorage);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState("");
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  // Modal Edit
  const handleClose = () => setShow(false);
  const handleOpen = (index, task) => {
    setShow(true);
    setEditIndex(index);
    setEdit(task);
  };
  // Add Task
  let list = [];
  const manageTask = (index) => {
    if (!index) {
      // Add
      if (getFromLocalStorage) {
        list = getFromLocalStorage;
      }
      if (!input) {
        return props.showAlert("Task can not be null", "info");
      }
      list.push(input);
      setTaskList(list);
      localStorage.setItem("AddTaskData", JSON.stringify(list));
      setInput("");
      return props.showAlert("Task added successfully", "success");
    } else {
      //Edit
      const updatedList = [...taskList];
      updatedList[editIndex] = edit;
      setTaskList(updatedList);
      localStorage.setItem("AddTaskData", JSON.stringify(updatedList));
      setEdit("");
      setShow(false);
      return props.showAlert("Task Updated successfully", "success");
    }
  };

  // Delete Task
  const deleteTask = (index) => {
    const deletedData = taskList.filter((el, i) => {
      return index !== i;
    });
    localStorage.setItem("AddTaskData", JSON.stringify(deletedData));
    setTaskList(deletedData);
    return props.showAlert("Task deleted successfully", "success");
  };

  // check change
  const checkChangeHandler = (checkData, index) => {
    let updatedChecked = [...isChecked];
    updatedChecked[index] = checkData;
    setIsChecked(updatedChecked);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="todo-top d-flex justify-content-center">
        <div className="2w-50">
          <div className="row">
            <h2
              style={{
                textDecoration: "underline",
              }}
            >
              To-do List
            </h2>
            <div className="form-floating d-flex justify-content-center">
              <textarea
                className="form-control"
                id="floatingTextarea"
                value={input}
                onChange={onChange}
                placeholder="abcd"
              ></textarea>
              <label htmlFor="floatingTextarea">Add Task</label>
              <AddBoxIcon
                style={{
                  width: 60,
                  height: 60,
                }}
                onClick={() => manageTask()}
              ></AddBoxIcon>
            </div>

            <div className="mt-4">
              {taskList?.length ? (
                <>
                  <h4>List of Task</h4>
                  {taskList.map((elem, id) => {
                    return (
                      <div className="d-flex justify-content-start" key={id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkBOX"
                          value={isChecked[id]}
                          onChange={(e) =>
                            checkChangeHandler(e.target.checked, id)
                          }
                          id="flexCheckDefault"
                        />
                        <div className="mx-2 card" style={{ width: "23rem" }}>
                          <h5 style={{ textDecoration: `${isChecked[id] ? "line-through" : "none"}` }}
                            className="mx-4">{elem}</h5>
                        </div>
                        <div className="mx-4d-flex">
                          <i
                            style={{
                              opacity: `${isChecked[id] ? "0.3" : "1"}`,
                              pointerEvents: `${isChecked[id] ? "none" : "all"
                                }`,
                            }}
                            className="fa fa-pencil-square-o"
                            onClick={() => handleOpen(id, elem)}
                            aria-hidden="true"
                          ></i>

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
                              <Button
                                variant="primary"
                                onClick={() => manageTask(id)}
                              >
                                Save
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          {/* Delete Icon For Task */}
                          <i
                            onClick={() => deleteTask(id)}
                            className="mx-4 fa fa-trash-o"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>No task</p>
              )}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDOList;
