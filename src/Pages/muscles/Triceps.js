import { useState, useEffect } from "react";
import "./AllMuscles.css"
const Triceps = () => {
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
                        <h1 className="muscle-name">{muscle[10].muscleGroup}</h1>
                        <img src={muscle[10].image} className="muscle-image" />
                        <div className="muscle-d-container">
                            <h1 className="muscle-description-text">Muscle Description:</h1>
                            <p className="muscle-description">{muscle[10].description}</p>
                        </div>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[10].exercises[0]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1043130130/preview/stock-footage-barbell-reverse-close-grip-bench-press-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[10].exercises[1]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1046311069/preview/stock-footage-chest-dip-on-dip-pull-up-cage-chest-exercise-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[10].exercises[2]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1016912131/preview/stock-footage-ez-barbell-decline-triceps-extension-exercise-anatomy-of-fitness-and-bodybuilding-target-muscles.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[10].exercises[3]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1046311012/preview/stock-footage-cable-rope-high-pulley-overhead-triceps-extension-upper-arms-exercise-d.webm" type="video/webm" />
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Triceps;