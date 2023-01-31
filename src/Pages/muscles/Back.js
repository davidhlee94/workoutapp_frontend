import { useState, useEffect } from "react";
import "./AllMuscles.css"
const Back = () => {
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
                        <h1 className="muscle-name">{muscle[1].muscleGroup}</h1>
                        <img src={muscle[1].image} className="muscle-image" />
                        <div className="muscle-d-container">
                            <h1 className="muscle-description-text">Muscle Description:</h1>
                            <p className="muscle-description">{muscle[1].description}</p>
                        </div>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[1].exercises[0]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/33735817/preview/stock-footage-pull-up-exercise-d-video.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[1].exercises[1]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1043189659/preview/stock-footage-dumbbell-one-arm-row-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[1].exercises[2]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1042980109/preview/stock-footage-cable-machine-wide-grip-lat-pulldown-female-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[1].exercises[3]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1046001271/preview/stock-footage-barbell-sumo-deadlift-hips-exercise-d.webm" type="video/webm" />
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Back;