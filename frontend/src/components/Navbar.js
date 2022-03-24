import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap'

const NavbarLink = (props) => {
    let isToken = localStorage.getItem('token')
    if (!isToken) {
        isToken = null
    }
    return (<>
        <Navbar className="fixed-top" bg={props.mode} variant={props.mode}>
            <Navbar.Brand href="/">{props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav activeKey="/addPatient"
                    className="mr-auto">
                    {!isToken ?
                        <>
                            <Nav.Link href="/login">{props.login}</Nav.Link>
                            <Nav.Link href="/signup">{props.signup}</Nav.Link>
                        </> :
                        <>
                            <Nav.Link href="/home">{props.home}</Nav.Link>
                            <Nav.Link href="/addPatient">{props.addPatient}</Nav.Link>
                            <Nav.Link href="/displayPatients">{props.displayPatients}</Nav.Link>
                            <Nav.Link href="/logout">{props.logout} </Nav.Link>
                        </>

                    }
                </Nav>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    {
                        isToken && <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    }

                    <div style={{ marginRight: "223px" }} className="form-check form-switch">
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className={`form-check-label text-${props.mode === 'dark' ? 'light' : 'dark'}`} htmlFor="flexSwitchCheckDefault">Theme</label>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    </>);
}

NavbarLink.defaultProps = {
    title: "CelloIP-Doctor",
    home: "Home",
    addPatient: "AddPatient",
    displayPatients: "DisplayPatients",
    form: "Form",
    login: "Login",
    signup: "Signup",
    logout: "Logout"
}

export default NavbarLink;