import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = (props) => {
    document.title = "Clinic - Home"
    const [userInfo, setUserInfo] = useState([])

    const userDetails = async () => {
        let userData = await axios.get(`http://localhost:8080/fetchPatientDetail`, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        })
        setUserInfo(userData.data)
    }

    useEffect(() => {
        userDetails();
        // eslint-disable-next-line
    }, [])

    return (<>

        <div className="container" >
            {
                userInfo &&
                <div className="card mb-5" style={{ top: "40px", width: "48rem" }}>
                    <div className="card-body" >
                        <h5 className="card-title">Welcome to   Clinic {userInfo.name ? <strong className='text-primary'>{userInfo.name.toUpperCase()}</strong> : ""}</h5>
                        <p style={{ color: props.theme === "dark" ? "red" : "black" }} className="card-text text-secondary">{userInfo.email ? userInfo.email : ""}</p>
                    </div>
                </div >
            }
        </div>
    </>);
}

export default Home;