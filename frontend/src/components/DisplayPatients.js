import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URI } from "../config/constants";

const DisplayPatients = (props) => {
    document.title = "Clinic - DisplayPatient"

    const [patient, setPatient] = useState([]);
    useEffect(() => {
        axios
            .get(`${BACKEND_URI}/patients`)
            .then((resp) => {
                const allData = resp.data.PatientsData;
                setPatient(allData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    }, []);

    const patientDeleteHandler = (id) => {
        axios
            .delete(`${BACKEND_URI}/patient/${id}`)
            .then((resp) => {
                const filteredData = patient.filter((ele) => ele._id !== id);
                setPatient(filteredData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    };

    return (
        <>
            <div className="mx-5 my-5" style={{ color: props.theme === "dark" ? "white" : "black" }}>
                <h2 className="mx-5 my-5">Manage Patients</h2>
                <table className="table table-bordered mx-5 my-5">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.filter(ele => props.search ? (
                            ele.name?.toLowerCase()?.includes(props.search?.toLowerCase()) ||
                            ele.age?.toString()?.includes(props.search?.toLowerCase()) ||
                            ele.email?.toLowerCase()?.includes(props.search?.toLowerCase())
                        ) : true)
                            .map((ele, index) => (
                                <tr key={ele._id}>
                                    <td>{index + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.age}</td>
                                    <td>{ele.email}</td>
                                    <div
                                        style={{
                                            textDecoration: "none",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Link className="nav-link" to={`/patient/${ele._id}`}>
                                            <i className="fa fa-pencil-square-o"
                                                aria-hidden="true"></i>
                                        </Link>
                                        <i
                                            onClick={() => patientDeleteHandler(ele._id)}
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="d-flex justify-content-end pagination">
                        <li className="page-item"><a className="page-link" href="">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="">1</a></li>
                        <li className="page-item"><a className="page-link" href="">2</a></li>
                        <li className="page-item"><a className="page-link" href="">3</a></li>
                        <li className="page-item"><a className="page-link" href="">Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default DisplayPatients;
