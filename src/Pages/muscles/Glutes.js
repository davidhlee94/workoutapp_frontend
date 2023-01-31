import { useState, useEffect } from "react";

const Glutes = () => {
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
                    <h1 className="">{muscle[6].muscleGroup}</h1>
                    <img src={muscle[6].image} className="muscle-image" />
                    <h1>Muscle Description:</h1>
                    <p className="muscle-description">{muscle[6].description}</p>
                    <h1>Common Exercises:</h1>
                    <p className="muscle-exercises">{muscle[6].exercises[0]}</p>
                    <p className="muscle-exercises">{muscle[6].exercises[1]}</p>
                    <p className="muscle-exercises">{muscle[6].exercises[2]}</p>
                    <p className="muscle-exercises">{muscle[6].exercises[3]}</p>
                    <p className="muscle-exercises">{muscle[6].exercises[4]}</p>
                </div>
            )}
        </div>
    )
}

export default Glutes;