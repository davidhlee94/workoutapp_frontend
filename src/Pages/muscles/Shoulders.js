import { useEffect, useState } from "react";
import "./AllMuscles.css"
const Shoulders = () => {
    const [muscle, setMuscle] = useState([])

    const getMuscleData = async () => {
        const response = await fetch("/muscles.json");
        const data = await response.json();
        setMuscle(data);
    }

    useEffect(() => {
        getMuscleData()
    }, [])

    return (
        <div className="mg-container">
            {muscle.length > 0 && (
                <div className="">
                    <h1 className="muscle-name">{muscle[9].muscleGroup}</h1>
                    <img src={muscle[9].image} className="muscle-image" />
                    <h1 className="muscle-description-text">Muscle Description:</h1>
                    <p className="muscle-description">{muscle[9].description}</p>
                    <h1>Common Exercises:</h1>
                    <p className="muscle-exercises">{muscle[9].exercises[0]}</p>
                    <p className="muscle-exercises">{muscle[9].exercises[1]}</p>
                    <p className="muscle-exercises">{muscle[9].exercises[2]}</p>
                    <p className="muscle-exercises">{muscle[9].exercises[3]}</p>
                    <p className="muscle-exercises">{muscle[9].exercises[4]}</p>
                </div>
            )}
        </div>
    )
}

export default Shoulders;