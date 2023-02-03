import { useContext } from "react";
import { UserContext } from "../data";
import RegisterForm from "../Components/RegisterForm";
import { setUserToken, clearUserToken } from "../utils/authToken";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
import { Modal } from "react-bootstrap";
import { useState } from "react";


function Auth(props) {
    // **CONSTANTS**
    const [showS, setShowS] = useState(false);
    const [showL, setShowL] = useState(false);
    const { setAuth, setUser } = useContext(UserContext)

    // **HANDLE SHOW AND CLOSE FOR THE MODALS**
    const handleShowS = () => setShowS(true);
    const handleShowL = () => setShowL(true);
    const handleCloseS = () => {
        setShowS(false);
    }
    const handleCloseL = () => {
        setShowL(false);
    }

    // **FUNCTION THAT REGISTERS USER - POST USER**
    const registerUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            // **FETCH NEW USERS**
            const newUser = await fetch(
                "https://workoutapp-backend.herokuapp.com/auth/register",
                configs
            )

            // **SETS THE USER TO JSON STORED IN CONSTANT**
            const parsedUser = await newUser.json()

            // **SETS LOCAL STORAGE**
            setUserToken(parsedUser.token)

            // **PUT THE RETURNED USER OBJECT IN A STATE**
            setUser(parsedUser.user)

            // **ADDS A BOOLEAN CAST OF THE RESPONSES ISAUTHENTCATED PROP**
            setAuth(parsedUser.isLoggedIn)

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
                "https://workoutapp-backend.herokuapp.com/auth/login",
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
        <div className="authentication-container">
            <h1 className="authenticate">Are you...</h1>
            <h3 className="auth-button-container">
                <button className="auth-button" onClick={() => {
                    handleShowL()
                }}>Logging In</button>
                or
                <button className="auth-button" onClick={() => {
                    handleShowS()
                }}>Signing Up</button>
            </h3>
            <h3>?</h3>
            <Modal show={showS} onHide={handleCloseS}>
                <RegisterForm signUp={registerUser} />
            </Modal>
            <Modal show={showL} onHide={handleCloseL}>
                <LoginForm signIn={loginUser} />
            </Modal>
        </div >
    )
}

export default Auth;
