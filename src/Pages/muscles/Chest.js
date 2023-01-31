import { useState, useEffect } from "react";
import "./AllMuscles.css"
const Chest = () => {
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
                        <h1 className="muscle-name">{muscle[4].muscleGroup}</h1>
                        <img src={muscle[4].image} className="muscle-image" />
                        <div className="muscle-d-container">
                            <h1 className="muscle-description-text">Muscle Description:</h1>
                            <p className="muscle-description">{muscle[4].description}</p>
                        </div>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[4].exercises[0]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/16516837/preview/stock-footage-pushups-video-guides-exercising-for-bodybuilding-target-muscles-are-marked-in-red-initial-and.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[4].exercises[1]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/33735811/preview/stock-footage-dumbbell-bench-press-exercise-d-video.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[4].exercises[2]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1010741828/preview/stock-footage-cable-lying-fly-anatomy-of-fitness-and-bodybuilding-chest-d.webm" type="video/webm" />
                            </video>
                        </div>
                        <div className="muscle-video-d">
                            <p className="muscle-exercises">{muscle[4].exercises[3]}</p>
                            <video controls className="video">
                                <source src="https://www.shutterstock.com/shutterstock/videos/1046311222/preview/stock-footage-cable-standing-up-straight-crossovers-chest-exercise-d.webm" type="video/webm" />
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chest;