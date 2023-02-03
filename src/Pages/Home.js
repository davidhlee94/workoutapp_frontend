import "./Home.css"
import { Link } from "react-router-dom";
import { UserContext } from "../data";
import { useContext } from "react";

const Home = () => {
    const { user } = useContext(UserContext)

    return (
        <div className="home-container">
            <img className="home-image" src="https://www.svgrepo.com/show/373467/bicep.svg" />
            <h1 className="home-title">Gainzville</h1>
            <p className="home-slogan">"Life has it's ups and downs. In Gainzville, we call those squats."</p>
            {!user.username ?
                <Link to="/auth">Sign In</Link> :
                <Link to="/workoutplan">Workout Plan</Link>
            }

        </div>
    )
}

export default Home;