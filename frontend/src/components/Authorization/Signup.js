import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
require('./Auth.css')

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ email: "Abhishek@gmail.com", password: "Password@123", name: "Abhishek" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json()
        if (!json.authToken) {
            props.showAlert("Wrong Credential", "danger")
            navigate("/login");
        }
        localStorage.setItem('token', json.authToken);
        props.showAlert("Register successful", "success")
        navigate("/");
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
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
                            <br /> Fees starting at ₹99
                            Verified doctors respond in 5 minutes
                            100% Private and confidential
                        </p>
                        <a className="btn" href="/login">Read More</a>
                    </div>
                </div>
                <div className="col-right">
                    <div className="login-form">
                        <h2>Signup</h2>
                        <form onSubmit={handleSubmit}>
                            <p>
                                <input type="name" placeholder="Name" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" />
                            </p>
                            <p>
                                <input type="email" placeholder="Email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                            </p>
                            <p>
                                <input type="password" placeholder="Password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                            </p>
                            <p>
                                <input className="btn" type="submit" value="Sign In" />
                            </p>
                            <p>
                                <Link to="/login">Already a user.</Link>
                            </p>
                            <button type="button" className="mx-5 login-with-google-btn" >
                                SignUp with Google
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Signup
