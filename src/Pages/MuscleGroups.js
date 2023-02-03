import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MuscleGroups.css"
const MuscleGroups = () => {

    // **CONSTANTS**
    const [muscleGroups, setMuscleGroups] = useState([])

    // **FETCHING MUSCLE DATA FROM LOCAL JSON**
    const getMuscleData = async () => {
        const response = await fetch("/muscles.json");
        const data = await response.json();
        setMuscleGroups(data)
    }

    // **USEEFFECT THAT RUNS GETMUSCLEDATA**
    useEffect(() => {
        getMuscleData();
    }, [])


    return (
        <div className="mg-container">
            <h1 className="mg-title">Muscle Info</h1>
            <div className="mg-card-container">
                {muscleGroups.map((data) => {
                    return (
                        <Link to={`/musclegroups/${data.muscleGroup}`} className="mg-link">
                            <div className="mg-card">
                                <img src={data.image} className="mg-image" />
                                <h1 className="mg-muscle">{data.muscleGroup}</h1>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default MuscleGroups;