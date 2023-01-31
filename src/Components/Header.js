import { Container, Nav, Navbar } from "react-bootstrap"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    const [expanded, setExpanded] = useState(false);

    return (
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
                                to="/workoutplan"
                                className="text-decoration-none navlinks"
                                onClick={() => setExpanded(false)}>
                                <div className="col text-center link-text ">
                                    WORKOUTS
                                </div>
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/musclegroups"
                                className="text-decoration-none navlinks"
                                onClick={() => setExpanded(false)}>
                                <div className="col text-center link-text ">
                                    MUSCLE INFO
                                </div>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;