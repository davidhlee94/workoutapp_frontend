import { useState, useEffect } from "react";
import "./AllMuscles.css"
const Quad = () => {
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
                    <h1 className="muscle-name">{muscle[8].muscleGroup}</h1>
                    <img src={muscle[8].image} className="muscle-image" />
                    <div className="muscle-d-container">
                        <h1 className="muscle-description-text">Muscle Description:</h1>
                        <p className="muscle-description">{muscle[8].description}</p>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        <p className="muscle-exercises">{muscle[8].exercises[0]}</p>
                        <p className="muscle-exercises">{muscle[8].exercises[1]}</p>
                        <p className="muscle-exercises">{muscle[8].exercises[2]}</p>
                        <p className="muscle-exercises">{muscle[8].exercises[3]}</p>
                        <p className="muscle-exercises">{muscle[8].exercises[4]}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Quad;