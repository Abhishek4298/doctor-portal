import React, { useState } from 'react';
import './style.css';

const ContactUs = () => {
  const [details, setDetails] = useState({ name: "", email: "", position: "", password: "", gender: "" })
  const [error, setError] = useState(
    // { errName: "", errEmail: "", errPosition: "", errPassword: "", gender: "" }
    "")

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        value.length < 5
          ?
          setError("asdasd")
          :
          setError('');
        break;
      // case 'email':
      //   value.length < 2
      //     ?
      //     error.errName('email should be greater then 2`')
      //     :
      //     setError('');
      //   break;
      default:
        break;
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    alert(JSON.stringify(details));
  }
  return (
    <>
      <div className='contact-top'>
        <div className="form-body">
          <div className="row">
            <div className="form-holder">
              <div className="form-content">
                <div className="form-items">
                  <h3>Coatact Us</h3>
                  <p>Fill in the data below.</p>
                  <form onSubmit={submitHandler} className="requires-validation" >
                    <div className="col-md-12">
                      <input
                        name="name"
                        value={details.name}
                        onChange={onChange}
                        className="form-control" type="text" placeholder="Full Name" required />
                      <span className='error'>{error}</span>
                    </div>

                    <div className="col-md-12">
                      <input
                        name="email"
                        value={details.email}
                        onChange={onChange}
                        className="form-control" type="email" placeholder="E-mail Address" required />
                      <span className='error'>{error}</span>
                    </div>

                    <div className="col-md-12">
                      <select defaultValue={'DEFAULT'} className="form-select mt-3" required>
                        <option disabled value="DEFAULT">Reference From</option>
                        <option value="jweb">Friends</option>
                        <option value="sweb">Famil</option>
                        <option value="pmanager">others</option>
                      </select>
                      <div className="valid-feedback">You selected a position!</div>
                      <div className="invalid-feedback">Please select a position!</div>
                    </div>


                    <div className="col-md-12">
                      <input
                        name="password"
                        value={details.password}
                        onChange={onChange}
                        className="form-control" type="password" placeholder="Password" autoComplete="on" required />
                      <div className="valid-feedback">Password field is valid!</div>
                      <div className="invalid-feedback">Password field cannot be blank!</div>
                    </div>

                    <div className="col-md-12 mt-3">
                      <label className="mb-3 mr-1" htmlFor="gender">Gender: </label>

                      <input type="radio" className="btn-check" name="gender" id="male" autoComplete="off" required />
                      <label className="btn btn-sm btn-outline-secondary" htmlFor="male">Male</label>

                      <input type="radio"
                        value={details.gender}
                        onChange={onChange}
                        className="btn-check" name="gender" id="female" autoComplete="off" required />
                      <label className="btn btn-sm btn-outline-secondary" htmlFor="female">Female</label>

                      <input type="radio"
                        value={details.name}
                        onChange={onChange}
                        className="btn-check" name="gender" id="secret" autoComplete="off" required />
                      <label className="btn btn-sm btn-outline-secondary" htmlFor="secret">Secret</label>
                      <div className="valid-feedback mv-up">You selected a gender!</div>
                      <div className="invalid-feedback mv-up">Please select a gender!</div>
                    </div>

                    {/* <div className="form-check">
											<input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
											<label className="form-check-label">I confirm that all data are correct</label>
											<div className="invalid-feedback">Please confirm that the entered data are all correct!</div>
										</div> */}

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