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
                <div className="mg-blocks-container">
                    <div className="muscle-name-image">
                        <h1 className="muscle-name">{muscle[9].muscleGroup}</h1>
                        <img src={muscle[9].image} className="muscle-image" />
                        <div className="muscle-d-container">
                            <h1 className="muscle-description-text">Muscle Description:</h1>
                            <p className="muscle-description">{muscle[9].description}</p>
                        </div>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[9].exercises[0]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1016791639/preview/stock-footage-dumbbell-shoulder-arnold-press-anatomy-of-fitness-and-bodybuilding-target-muscles-are-marked-red.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[9].exercises[1]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1017638002/preview/stock-footage-dumbbell-standing-bent-arm-lateral-raise-exercise-anatomy-of-fitness-and-bodybuilding-target.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[9].exercises[2]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1016912062/preview/stock-footage-cable-seated-rear-lateral-raise-exercise-anatomy-of-fitness-and-bodybuilding-target-muscles-are.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[9].exercises[3]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1042980985/preview/stock-footage-barbell-shoulder-grip-upright-row-female-d.webm" type="video/webm" />
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Shoulders;