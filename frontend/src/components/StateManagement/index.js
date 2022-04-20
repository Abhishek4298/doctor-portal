import { useState } from "react";
import './style.css';

const StateManagement = () => {
  const [details, setDetails] = useState({
    name: "", email: "", position: "", password: "", confPass: "", gender: "",
    schoolMarks: "", collegeGrade: ""
  })

  const [nextPage, setNextPage] = useState(true)

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    alert(JSON.stringify(details));
  }
  const nextPageHandler = () => {
    setNextPage(curr => !curr)
  }

  return (<>
    <h2 className="text-center">State Management</h2>
    <div className='state-top'>
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                {nextPage
                  ? <h3>Personal Information </h3> : <h3> Education Information</h3>
                }
                <p>Fill in the data below.</p>
                <form onSubmit={submitHandler} className="requires-validation" >
                  {nextPage
                    ?
                    <>
                      <div className="col-md-12">
                        <input
                          name="name"
                          value={details.name}
                          onChange={onChange}

                          className="form-control" type="text" placeholder="Full Name" />
                      </div>
                      <div className="col-md-12">
                        <input
                          name="email"
                          value={details.email}
                          onChange={onChange}

                          className="form-control" type="text" placeholder="E-mail Address" />
                      </div>
                      <div className="col-md-12">
                        <select
                          name="position"
                          value={details.position}
                          onChange={onChange}
                          className="form-select mt-3" >
                          <option value="">Select Reference</option>
                          <option value="Friends">Friends</option>
                          <option value="Family">Family</option>
                          <option value="others">others</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <input
                          name="password"
                          value={details.password}
                          onChange={onChange}

                          className="form-control" type="password" placeholder="Password" autoComplete="on" />
                        <div className="valid-feedback">Password field is valid!</div>
                      </div>
                      <div className="col-md-12">
                        <input
                          name="confPass"
                          value={details.confPass}
                          onChange={onChange}
                          className="form-control" type="password" placeholder="confPass" autoComplete="on" />
                        <div className="valid-feedback">Confirm Password field is valid!</div>
                      </div>
                      <div className="col-md-12 mt-3">
                        <label className="mb-3 mr-1" htmlFor="gender">Gender: </label>
                        <input
                          type="radio"
                          value="male"
                          onChange={onChange}
                          name="gender"
                          className="btn-check"
                          id="male" autoComplete="off" />
                        <label className="btn btn-sm btn-outline-secondary" htmlFor="male">Male</label>
                        <input type="radio"
                          value="female"
                          onChange={onChange}
                          name="gender"
                          className="btn-check"
                          id="female" autoComplete="off" />
                        <label className="btn btn-sm btn-outline-secondary" htmlFor="female">Female</label>
                        <input
                          type="radio"
                          value="other"
                          onChange={onChange}
                          name="gender"
                          className="btn-check"
                          id="secret" autoComplete="off" />
                        <label className="btn btn-sm btn-outline-secondary" htmlFor="secret">Other</label>
                        <div className="valid-feedback mv-up">You selected a gender!</div>
                        <div className="invalid-feedback mv-up">Please select a gender!</div>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" value="term1" name="term" type="checkbox" id="invalidCheck" />
                        <label className="form-check-label">I confirm that all data are correct</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" value="term2" name="term" type="checkbox" id="invalidCheck" />
                        <label className="form-check-label">Save Credentials</label>
                      </div>
                    </>
                    :
                    <>
                      <div className="col-md-12">
                        <input
                          name="schoolMarks"
                          value={details.schoolMarks}
                          onChange={onChange}
                          className="form-control" type="text" placeholder="Enter 10th Marks" />
                      </div>
                      <div className="col-md-12">
                        <input
                          name="collegeGrade"
                          value={details.collegeGrade}
                          onChange={onChange}
                          className="form-control" type="text" placeholder="Enter last semester grade" />
                      </div>
                    </>
                  }
                  {nextPage
                    ?
                    <div>
                      <div className="form-button mt-3">
                        <button id="submit" type="submit" className="btn btn-primary" disabled>Submit</button>
                      </div>
                      <div className="form-button mt-3">
                        <button onClick={nextPageHandler} type="button" className="btn btn-primary">Next</button>
                      </div>
                    </div>
                    :
                    <>
                      <div className="form-button mt-3">
                        <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                      </div>
                      <div className="form-button mt-3">
                        <button id="submit" type="button" onClick={nextPageHandler} className="btn btn-primary">Previos Page</button>
                      </div>
                    </>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <pre className='outputResult'>{JSON.stringify(details, undefined, 2)}</pre>
      </div>
    </div>
  </>);
}

export default StateManagement;