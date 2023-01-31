import { useEffect, useState } from "react";
import "./AllMuscles.css"

const Abs = () => {
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
                        <h1 className="muscle-name">{muscle[0].muscleGroup}</h1>
                        <img src={muscle[0].image} className="muscle-image" />
                        <div className="muscle-d-container">
                            <h1 className="muscle-description-text">Muscle Description:</h1>
                            <p className="muscle-description">{muscle[0].description}</p>
                        </div>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[0].exercises[0]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1017638011/preview/stock-footage-lever-lying-crunch-exercise-anatomy-of-fitness-and-bodybuilding-target-muscles-are-red-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[0].exercises[1]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1017032323/preview/stock-footage-leg-raise-hip-lift-with-head-up-exercise-anatomy-of-fitness-and-bodybuilding-targeted-muscles-are.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[0].exercises[2]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1046000944/preview/stock-footage-front-plank-waist-exercise-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[0].exercises[3]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1043189938/preview/stock-footage-weighted-russian-twist-exercise-d.webm" type="video/webm" />
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Abs;
