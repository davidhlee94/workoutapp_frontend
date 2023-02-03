import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterForm = ({ signUp }) => {
    // **CONSTANTS**
    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

    // **HANDLESUBMIT REGISTERS THE USER**
    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signUp(input)
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
            <h1>Register</h1>
            <img className="auth-image" src='https://media3.giphy.com/media/3orif0OR0foo5DdjlS/giphy.gif?cid=ecf05e47xkwcz8yhfn8p8co08yx35by0cdc44p4i6bnit0n3&rid=giphy.gif&ct=g' />
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    className='input'
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    className='input'
                    id="password"
                    name="password"
                    type="password"
                    value={input.password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <div className='auth-button-2-container'>
                    <input
                        className="auth-button-2"
                        type="submit"
                        value="Sign Up" />
                </div>
            </form>
        </div >
    );
};

export default RegisterForm;