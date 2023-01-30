import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div>
            {muscleGroups.map((data) => {
                return (
                    <Link to={`/musclegroups/${data.muscleGroup}`}>
                        <div>
                            <h1>{data.muscleGroup}</h1>
                            <img src={data.image} />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default MuscleGroups;