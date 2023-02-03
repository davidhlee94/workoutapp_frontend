import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterForm = ({ signUp }) => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

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

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <div className='auth-form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: </label>
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
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default RegisterForm;