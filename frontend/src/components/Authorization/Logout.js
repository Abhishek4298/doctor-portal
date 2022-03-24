import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();
    props.showAlert("Logout", "info")
    navigate("/login");

    return (
        <div>
            {
                localStorage.removeItem("token")
            }
        </div>
    )
}

export default Logout