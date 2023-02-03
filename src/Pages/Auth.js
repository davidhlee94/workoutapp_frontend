import { useContext } from "react";
import { UserContext } from "../data";
import RegisterForm from "../Components/RegisterForm";
import { setUserToken, clearUserToken } from "../utils/authToken";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
import { Modal } from "react-bootstrap";
import { useState } from "react";

// src/pages/Auth.jsx

function Auth(props) {
    const [showS, setShowS] = useState(false);
    const [showL, setShowL] = useState(false);
    const handleShowS = () => setShowS(true);
    const handleShowL = () => setShowL(true);
    const handleCloseS = () => {
        setShowS(false);
    }
    const handleCloseL = () => {
        setShowL(false);
    }
    const navigate = useNavigate()
    const { setAuth, setUser } = useContext(UserContext)

    // we will replace our placeholder jsx with a section container and a RegisterForm component

    const registerUser = async (data) => {
        try {

            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const newUser = await fetch(
                "http://localhost:4000/auth/register",
                configs
            )

            const parsedUser = await newUser.json()
            // console.log(parsedUser)

            // sets local storage
            setUserToken(parsedUser.token)
            // put the returned user object in state
            setUser(parsedUser.user)
            // adds a boolean cast of the responses isAuthenticated prop
            setAuth(parsedUser.isLoggedIn)

            // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
            // this would also require reconfiguring our backend so we only send tokens with a signup

            return parsedUser

        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }


    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const response = await fetch(
                "http://localhost:4000/auth/login",
                configs
            )

            const currentUser = await response.json()
            console.log(currentUser)

            if (currentUser.token) {
                // sets local storage
                setUserToken(currentUser.token)
                // put the returned user object in state
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)

                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }



    return (
        <section className="authentication-container">
            <h1 className="authenticate">Are you...</h1>
            <h3 className="auth-button-container">
                <button className="auth-button" onClick={() => {
                    handleShowL()
                }}>Logging In</button>
                or
                <button className="auth-button" onClick={() => {
                    handleShowS()
                }}>Signing Up</button>
                ?
            </h3>
            <Modal show={showS} onHide={handleCloseS}>
                <RegisterForm signUp={registerUser} />
            </Modal>
            <Modal show={showL} onHide={handleCloseL}>
                <LoginForm signIn={loginUser} />
            </Modal>
        </section >
    )
}

export default Auth;
