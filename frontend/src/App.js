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
import GoogleAUTH from "./components/Authorization/GoogleAUth";
import Calculator from "./components/Calculator/index";
import ToDOList from "./components/ToDOList/index";
import ContactUs from "./components/common/ContactUs";
import ReducerDemo from "./components/ReducerDemo";
import ReduxDemo from "./Redux/index";
import Restaurant_Mng from "./Restaurant_Mng/index";
import StateManagement from "./components/StateManagement";
import ReusableComponent from "./components/ReusableComponent";
import ReactTableDemo from "./components/ReactTableDemo";

require('./App.css')

function App() {
  let [theme, setTheme] = useState("light")
  let [alert, setAlert] = useState(null)
  const [search, setSearch] = useState("")
  const onSearch = (data) => {
    setSearch(data)
  }
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

  const RequireAuth = ({ authUser }) => {
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
        onSearch={onSearch}
      />
      <Alert alert={alert} />
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            path="/signup"
            element={
              <Signup showAlert={showAlert} theme={theme} />}
          />
          <Route
            path="/logout"
            element={<Logout theme={theme} showAlert={showAlert} />}
          />
          <Route
            path="/todolist"
            element={<ToDOList showAlert={showAlert} />}
          />
          <Route
            path="/calculator"
            element={<Calculator />}
          />
          <Route
            path="/contact-us"
            element={
              <ContactUs />}
          />
          <Route
            path="/reducerDemo"
            element={
              <ReducerDemo />}
          />
          <Route
            path="/reduxDemo"
            element={
              <ReduxDemo />}
          />
          <Route
            path="/storeMngt"
            element={
              <Restaurant_Mng />}
          />
          <Route
            path="/stateMngt"
            element={
              <StateManagement />}
          />
          <Route
            path="/reusableComponent"
            element={
              <ReusableComponent />}
          />
          <Route
            path="/reactTable"
            element={
              <ReactTableDemo />}
          />
          <Route element={<RequireAuth authUser={isToken} />} >
            <Route
              path="/home"
              element={
                <Home theme={theme} showAlert={showAlert}
                />
              }
            />
            <Route
              path="/googleAuth"
              element={<GoogleAUTH />}
            />
            <Route
              path="/addPatient"
              element={
                <AddPatient theme={theme} showAlert={showAlert} />}
            />
            <Route
              path="/patient/:id"
              element={
                <AddPatient theme={theme} showAlert={showAlert} />}
            />
            <Route
              path="/displayPatients"
              element={
                <DisplayPatients search={search} theme={theme} showAlert={showAlert} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
