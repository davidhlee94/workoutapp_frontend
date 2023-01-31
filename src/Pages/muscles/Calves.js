import { useState, useEffect } from "react";
import "./AllMuscles.css"
const Calves = () => {
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
                    <h1 className="muscle-name">{muscle[3].muscleGroup}</h1>
                    <img src={muscle[3].image} className="muscle-image" />
                    <h1 className="muscle-description-text">Muscle Description:</h1>
                    <p className="muscle-description">{muscle[3].description}</p>
                    <h1>Common Exercises:</h1>
                    <p className="muscle-exercises">{muscle[3].exercises[0]}</p>
                    <p className="muscle-exercises">{muscle[3].exercises[1]}</p>
                    <p className="muscle-exercises">{muscle[3].exercises[2]}</p>
                    <p className="muscle-exercises">{muscle[3].exercises[3]}</p>
                    <p className="muscle-exercises">{muscle[3].exercises[4]}</p>
                </div>
            )}
        </div>
    )
}

export default Calves;