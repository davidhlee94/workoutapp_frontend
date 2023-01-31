import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MuscleGroups.css"
const MuscleGroups = () => {
    const [muscleGroups, setMuscleGroups] = useState([])

    const getMuscleData = async () => {
        const response = await fetch("/muscles.json");
        const data = await response.json();
        setMuscleGroups(data)
    }

    useEffect(() => {
        getMuscleData();
    }, [])


    return (
        <div className="mg-container">
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
    )
}

export default MuscleGroups;