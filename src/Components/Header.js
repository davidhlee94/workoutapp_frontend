import { Container, Nav, Navbar } from "react-bootstrap"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./Header.css"
import { getUserToken } from "../utils/authToken";
import { clearUserToken } from "../utils/authToken";
import { useContext } from "react";
import { UserContext } from "../data";
import { useEffect } from "react";

const Header = () => {
    // **CONSTANTS**
    const [expanded, setExpanded] = useState(false);
    const [message, setMessage] = useState("")
    const token = getUserToken()
    const { setAuth, setUser, user } = useContext(UserContext)

    // **LOGS THE USER OUT**
    const logoutUser = () => {
        clearUserToken();
        setAuth(false);
        setUser({});
        window.localStorage.clear()
    };

    // **USEEFFECT THAT CHECK TO SEE IF USER OBJECT IS FILLED TO DISPLAY MESSAGE, TRACKS CHANGE IN USER**
    useEffect(() => {
        if (user.username) {
            setMessage(
                <div class="alert alert-success" role="alert">
                    You have successfully logged in {user.username}!
                </div>)
        } else {
            setMessage(
                < div class="alert alert-danger" role="alert" >
                    You have successfully logged out.
                </div >
            )
        }
        setTimeout(() => {
            setMessage("")
        }, 4000)
    }, [user])


    return (
        <>
            <div>
                <Navbar className="color-nav sticky-top" expand="lg" expanded={expanded}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <div className="brand-icon-and-brand">
                                <img src="https://www.svgrepo.com/show/373467/bicep.svg" className="brand-icon" />
                                <div className="brand">Gainzville</div>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle
                            className="custom-toggler navbar-toggler"
                            aria-controls="responsive-navbar-nav"
                            onClick={() => setExpanded(expanded ? false : "expanded")} />
                        <Navbar.Collapse className="responsive-navbar-nav right-aligned">
                            <Nav className="nav brackets">
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    className="text-decoration-none navlinks"
                                    onClick={() => setExpanded(false)}>
                                    <div className="col text-center link-text ">
                                        HOME
                                    </div>
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/about"
                                    className="text-decoration-none navlinks"
                                    onClick={() => setExpanded(false)}>
                                    <div className="col text-center link-text ">
                                        ABOUT
                                    </div>
                                </Nav.Link>
                                {user.username &&
                                    <Nav.Link
                                        as={Link}
                                        to="/workoutplan"
                                        className="text-decoration-none navlinks"
                                        onClick={() => setExpanded(false)}>
                                        <div className="col text-center link-text ">
                                            WORKOUTS
                                        </div>
                                    </Nav.Link>
                                }
                                <Nav.Link
                                    as={Link}
                                    to="/musclegroups"
                                    className="text-decoration-none navlinks"
                                    onClick={() => setExpanded(false)}>
                                    <div className="col text-center link-text ">
                                        MUSCLE INFO
                                    </div>
                                </Nav.Link>
                                {user.username &&
                                    <Nav.Link
                                        as={Link}
                                        to="/"
                                        className="text-decoration-none navlinks"
                                        onClick={() => {
                                            logoutUser();
                                            setExpanded(false);
                                        }}>
                                        <div className="col text-center link-text-logout ">
                                            LOG OUT
                                        </div>
                                    </Nav.Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
            {message}
        </>
    )
}

export default Header;