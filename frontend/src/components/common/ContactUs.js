import React, { useState } from 'react';
import './style.css';

const ContactUs = () => {
  const [details, setDetails] = useState({ name: "", email: "", position: "", password: "", gender: "" })
  const [error, setError] = useState({})

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value })
  }

  // Errror handline at onBlur
  const onBlur = () => {
    setError(validateError(details))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    alert(JSON.stringify(details));
  }

  const validateError = (values) => {
    let updatedError = { ...error }
    const mailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.name) {
      updatedError.name = "Name is required"
    }
    else {
      values.name.length < 5 ?
        updatedError.name = "Name character should be greate 5 character"
        :
        updatedError.name = ""
    }

    // Email Validate
    if (!values.email) {
      updatedError.email = "Email is required"
    }
    else {
      mailFormate.test(String(values.email).toLowerCase()) ?
        updatedError.email = "This is not a valid email format!" :
        updatedError.email = ""
    }

    // Password Validate
    if (!values.password) {

      updatedError.password = "Password is required"
    }
    else {
      values.password.length < 4 ?
        updatedError.password = "Password must be of 4 characters"
        :
        updatedError.password = ""
    }

    // Postion Validate
    if (!values.position) {
      updatedError.position = "Position is required"
    } else {
      updatedError.position = ""
    }

    // Gender Validate
    if (!values.gender) {
      updatedError.gender = "Gender is required"
    } else {
      updatedError.gender = ""
    }
    return updatedError
  }

  return (
    <>
      <div className='contact-top'>
        <div className="form-body">
          <div className="row">
            <div className="form-holder">
              <pre className='outputResult'>{JSON.stringify(details, undefined, 2)}</pre>
              <div className="form-content">
                <div className="form-items">
                  <h3>Contact Us</h3>
                  <p>Fill in the data below.</p>
                  <form onSubmit={submitHandler} className="requires-validation" >
                    <div className="col-md-12">
                      <input
                        name="name"
                        value={details.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-control" type="text" placeholder="Full Name" />
                      <span className='error'>{error?.name}</span>
                    </div>

                    <div className="col-md-12">
                      <input
                        name="email"
                        value={details.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-control" type="text" placeholder="E-mail Address" />
                      <span className='error'>{error?.email}</span>
                    </div>

                    <div className="col-md-12">
                      <select
                        name="position"
                        value={details.position}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-select mt-3" >
                        <option value="">Select Reference</option>
                        <option value="Friends">Friends</option>
                        <option value="Family">Family</option>
                        <option value="others">others</option>
                      </select>
                      <span className='error'>{error?.position}</span>
                    </div>

                    <div className="col-md-12">
                      <input
                        name="password"
                        value={details.password}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="form-control" type="password" placeholder="Password" autoComplete="on" />
                      <div className="valid-feedback">Password field is valid!</div>
                      <div className="invalid-feedback">Password field cannot be blank!</div>
                      <span className='error'>{error?.password}</span>
                    </div>

                    <div className="col-md-12 mt-3">
                      <label className="mb-3 mr-1" htmlFor="gender">Gender: </label>
                      <input
                        type="radio"
                        value="male"
                        onChange={onChange}
                        onBlur={onBlur}
                        name="gender"
                        className="btn-check"
                        id="male" autoComplete="off" />
                      <label className="btn btn-sm btn-outline-secondary" htmlFor="male">Male</label>

                      <input type="radio"
                        value="female"
                        onChange={onChange}
                        onBlur={onBlur}
                        name="gender"
                        className="btn-check"
                        id="female" autoComplete="off" />
                      <label className="btn btn-sm btn-outline-secondary" htmlFor="female">Female</label>

                      <input
                        type="radio"
                        value="other"
                        onChange={onChange}
                        onBlur={onBlur}
                        name="gender"
                        className="btn-check"
                        id="secret" autoComplete="off" />
                      <label className="btn btn-sm btn-outline-secondary" htmlFor="secret">Other</label>
                      <div className="valid-feedback mv-up">You selected a gender!</div>
                      <div className="invalid-feedback mv-up">Please select a gender!</div>
                      <span className='error'>{error?.password}</span>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" value="term1" name="term" type="checkbox" id="invalidCheck" />
                      <label className="form-check-label">I confirm that all data are correct</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" value="term2" name="term" type="checkbox" id="invalidCheck" />
                      <label className="form-check-label">Save Credentials</label>
                    </div>

                    <div className="form-button mt-3">
                      <button id="submit" type="submit" className="btn btn-primary">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}

export default ContactUs;