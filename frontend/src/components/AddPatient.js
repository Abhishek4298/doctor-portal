import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URI } from "../config/constants";

const AddPatient = (props) => {
    document.title = "Clinic - AddPatient"
    let { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState([]);

    const onInputChange = async (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };
    const getUserData = async (e) => {
        axios
            .get(`${BACKEND_URI}/patient/${id}`)
            .then((resp) => {
                const allData = resp.data.PatientData;
                setPatient(allData);
            })
            .catch((err) => {
                props.showAlert("unable to fetch data", "danger")
            });
    }
    useEffect(() => {
        if (id) {
            getUserData()
            // eslint-disable-next-line
        }
    }, [])

    const { name, age, email, password } = patient;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            // Update Patient
            axios
                .put(`${BACKEND_URI}/patient/${id}`, patient)
                .then(() => {
                    navigate("/displayPatients");
                    props.showAlert("Patient detail Updated", "success")
                })
                .catch((error) => {
                    props.showAlert("can not update Patient", "danger")
                });
        }
        // Add Patient
        axios
            .post(`${BACKEND_URI}/register`, patient)
            .then(() => {
                props.showAlert("Patient details Inserted", "success")
                navigate("/displayPatients");
            })
            .catch((error) => {
                props.showAlert("Patient is not registered", "danger")
            });
    };
    const handleReset = (e) => {
        setPatient([])
    }
    return (
        <form onSubmit={e => { e.preventDefault() }}>
            <center>
                <h2>{id ? "Update" : "Add"} User</h2>
                <div style={{ marginTop: "40px" }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => onInputChange(e)}
                            placeholder="Enter your name"
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Age
                        <input
                            type="text"
                            value={age}
                            name="age"
                            onChange={(e) => onInputChange(e)}
                            placeholder="Your age"
                        />
                    </label>
                    <br />
                    <label>
                        email:
                        <input
                            type="text"
                            value={email}
                            name="email"
                            onChange={(e) => onInputChange(e)}
                            placeholder="Your email address"
                            required
                        />
                    </label>
                    <br />
                    <label>
                        password:
                        <input
                            type="text"
                            value={password}
                            name="password"
                            onChange={(e) => onInputChange(e)}
                            placeholder="Your password"
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={handleReset} type="reset" className="btn btn-primary mx-2">Reset</button>
                </div>
            </center>
        </form>
    );
}
export default AddPatient;
