import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Form.css"


const LoginForm = ({ signIn }) => {
    // **CONSTANTS**
    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

    // **HANDLESUBMIT LOGS THE USER IN**
    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signIn(input)
        if (createdUserToken) {
            navigate("/workoutplan")
        } else {
            navigate("/")
        }
        setInput(initialState);
    };

    // **HANDLECHANGE SETS THE INPUT INFORMATION**
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <div className='auth-form-container'>
            <h1 >Login</h1>
            <img className="auth-image" src='https://33.media.tumblr.com/48d5b505077d12cc479ebc2ff5d5e2ca/tumblr_nk7if66hJ21s6wlblo1_500.gif' />
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor="username">Name: </label>
                    <input
                        className='input'
                        id="username"
                        name="username"
                        value={input.username}
                        onChange={handleChange}

                    />
                </div>
                <br />
                <div className='input-container'>
                    <label htmlFor="password">Password: </label>
                    <input
                        className='input'
                        id="password"
                        name="password"
                        type="password"
                        value={input.password}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className='auth-button-2-container'>
                    <input
                        className="auth-button-2"
                        type="submit"
                        value="Log In" />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;