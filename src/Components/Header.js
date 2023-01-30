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
                    <Navbar.Brand>
                        <div>
                            <div className="brand">Gains +100</div>
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
                                <div className="link-text">
                                    Home
                                </div>
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/workoutplan"
                                className="text-decoration-none navlinks"
                                onClick={() => setExpanded(false)}>
                                <div className="link-text">
                                    Workouts
                                </div>
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/musclegroups"
                                className="text-decoration-none navlinks"
                                onClick={() => setExpanded(false)}>
                                <div className="link-text">
                                    Muscle Groups
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