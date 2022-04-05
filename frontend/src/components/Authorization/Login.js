import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
require('./Auth.css')

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "Abhishek@gmail.com", password: "Password@123" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BACKEND_URI}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (!json.authToken) {
            props.showAlert("Wrong Credential", "danger")
            navigate("/login");
        }
        else {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Login successful", "success")
            navigate("/home");
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const GoogleApi = () => {
        axios
            .get(`${BACKEND_URI}/google-auth/google`)
            .then((resp) => {
                navigate("/googleAuth");
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    }
    return (
        <div style={{ padding: "0px" }}>
            <div className="container">
                <div className="col-left">
                    <div className="login-text">
                        <h2>  Clinic</h2>
                        <p>
                            Skip the waiting room.
                            Consult with a doctor
                            <br /> Fees starting at $xx
                            Verified doctors respond in 5 minutes
                            100% Private and confidential
                        </p>
                        <a className="btn" href="/login">Read More</a>
                    </div>
                </div>
                <div className="col-right">
                    <div className="login-form">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <p>

                                <input type="email" placeholder="Email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />

                            </p>
                            <p>
                                <input type="password" placeholder="Password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                            </p>
                            <p>
                                <input className="btn" type="submit" value="Sign In" />

                            </p>
                            <p>
                                <Link to="/login">Forget password?</Link>
                                <Link className="mx-2" to="/signup">Create an account.</Link>

                            </p>
                            <button type="button" onClick={GoogleApi} className="mx-5 login-with-google-btn" >
                                Login with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
