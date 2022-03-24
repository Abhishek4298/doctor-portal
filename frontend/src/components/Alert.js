import React from 'react'

const Alert = ({ alert }) => {
    return (
        <>
            <div style={{ width: '100%' }}>
                <div className="m-5" style={{ height: "70px" }}>
                    {
                        alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                            <strong>{alert.type}:</strong>{alert.msg}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    }
                </div>
            </div>

        </>

    )
}

export default Alert