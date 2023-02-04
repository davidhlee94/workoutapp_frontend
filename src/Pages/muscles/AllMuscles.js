import { useEffect, useState } from "react";
import "./AllMuscles.css"
import { useParams } from "react-router-dom";

const AllMuscles = (params) => {
    // **CONSTANTS**
    const [muscles, setMuscle] = useState([])
    const { name } = useParams()


    // **FUNCTIONS THAT GRABS ALL MUSCLEDATA FROM LOCAL JSON AND PUTS IT INTO AN ARRAY**
    const getMuscleData = async () => {
        const response = await fetch("/muscles.json");
        const data = await response.json();
        const newArray = data.filter((muscle) => {
            return (
                muscle.muscleGroup === name
            )
        })
        setMuscle(newArray);
    }
    console.log(name)


    // **USEEFFECT THAT RUNS GETCOLLECTIONS, THAT TRACKS THE STATE OF SHOW**
    useEffect(() => {
        getMuscleData()
    }, [])

    return (
        <div className="mg-container">
            {muscles.length > 0 && (
                <div className="mg-blocks-container">
                    <div className="muscle-name-image">
                        <h1 className="muscle-name">{muscles[0].muscleGroup}</h1>
                        <img src={muscles[0].image} className="muscle-image" />
                        <div className="muscle-d-container">
                            <h1 className="muscle-description-text">Muscle Description:</h1>
                            <p className="muscle-description">{muscles[0].description}</p>
                        </div>
                    </div>
                    <div className="muscle-ce-container">
                        <h1 className="muscle-ce">Common Exercises:</h1>
                        {muscles[0].exercises.map((exercise) => (
                            <div className="muscle-video-d">
                                <p className="muscle-exercises">{exercise.description}</p>
                                <video controls className="video">
                                    {/* <source src={exercise.video} type="video/webm" /> */}
                                    <source src="https://www.shutterstock.com/shutterstock/videos/16516837/preview/stock-footage-pushups-video-guides-exercising-for-bodybuilding-target-muscles-are-marked-in-red-initial-and.webm" type="video/webm">
                                    </source>
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllMuscles;
