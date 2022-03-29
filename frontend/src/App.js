import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from './components/Home';
import NavbarLink from './components/Navbar';
import { useState } from 'react';
import Alert from './components/Alert';
import Login from './components/Authorization/Login';
import Signup from './components/Authorization/Signup';
import Logout from './components/Authorization/Logout';
import AddPatient from "./components/AddPatient";
import DisplayPatients from "./components/DisplayPatients";
import Layout from "./components/Layout";
require('./App.css')

function App() {
  let [theme, setTheme] = useState("light")
  let [alert, setAlert] = useState(null)

  const showAlert = ((message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  })

  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
      document.body.style.backgroundColor = 'white';
      showAlert("Dark mode enabled", "success")
    }
    else {
      setTheme("dark")
      document.body.style.backgroundColor = '#6c757d';
      showAlert("Light mode enabled", "success")
    }
  }

  let isToken = localStorage.getItem('token')

  function RequireAuth({ authUser }) {
    const location = useLocation();
    if (!authUser) {
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
  }

  return (
    <>
      <NavbarLink mode={theme}
        toggleMode={toggleMode}
      />
      <Alert alert={alert} />
      <div className="row">
        <div className="col-md-12"></div>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route
              path="/login"
              element={
                <>
                  <Login
                    showAlert={showAlert}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Signup
                    showAlert={showAlert}
                    theme={theme}
                  />
                </>
              }
            />
            <Route
              path="/logout"
              element={
                <>
                  <Logout
                    theme={theme}
                    showAlert={showAlert}
                  />
                </>
              }
            />
            <Route element={<RequireAuth authUser={isToken} />} >
              <Route
                path="/home"
                element={
                  <>
                    <Home
                      theme={theme}
                      showAlert={showAlert}
                    />
                  </>
                }
              />
              <Route
                path="/addPatient"
                element={
                  <>
                    <AddPatient
                      theme={theme}
                      showAlert={showAlert}
                    />
                  </>
                }
              />
              <Route
                path="/patient/:id"
                element={
                  <>
                    <AddPatient
                      theme={theme}
                      showAlert={showAlert}
                    />
                  </>
                }
              />
              <Route
                path="/displayPatients"
                element={
                  <>
                    <DisplayPatients
                      theme={theme}
                      showAlert={showAlert}
                    />
                  </>
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
