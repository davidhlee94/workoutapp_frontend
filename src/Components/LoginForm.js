import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Form.css"

const LoginForm = ({ signIn }) => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

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

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <div className='auth-form-container'>
            <h1 >Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: </label>
                <input className='input'
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
                <input type="submit" value="Log In" />
            </form>
        </div>
    );
};

export default LoginForm;