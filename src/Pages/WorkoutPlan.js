import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./WorkoutPlan.css"

const WorkoutPlan = () => {
    const URL = "http://localhost:4000/collection";
    const [collection, setCollection] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        window.location.reload()
    }
    const handleShow = () => setShow(true);
    const [newForm, setNewForm] = useState({
        collectionName: "",
        description: "",
        exercises: []
    });

    const getCollections = async () => {
        try {
            const response = await fetch(URL);
            const allCollections = await response.json();
            setCollection(allCollections)
        } catch (error) {
            console.log(error);
        }
    }

    const createWorkoutPlan = async (workoutData) => {
        try {
            await fetch(`http://localhost:4000/collection`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(workoutData),
            });
            getCollections();
        } catch (error) {
            console.log(error)
        }
    }


    const deleteWorkoutPlan = async (id) => {
        try {
            const options = {
                method: "DELETE"
            };
            const response = await fetch(`http://localhost:4000/collection/${id}`, options);
            const deletedWorkout = await response.json();
            navigate("/workoutplan");
        } catch (error) {
            console.log(error)
        }
    };


    const loaded = () => {
        return collection.map((collections) => (
            <div key={collections._id} className="workout-container">
                <Link to={`/collection/${collections._id}`} className="workout-link">
                    <h2 className="collection-name">{collections.collectionName}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" onClick={() => deleteWorkoutPlan(collections._id)} />
                    </svg>
                </Link>
            </div>
        ))
    }

    const loading = () => {
        <div>Loading your gains...</div>;
    }


    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentState = { ...newForm };
        createWorkoutPlan(currentState);
        setNewForm({
            collectionName: "",
            description: "",
            exercises: []
        });
        handleClose();
    };

    useEffect(() => {
        getCollections();
    }, []);

    return (
        <div className="workoutplans-container">
            <Modal show={show} onHide={handleClose} className="modal">
                <form onSubmit={handleSubmit} className="form" >
                    <div className="form-content">
                        <h1 className="form-title">Create a Workout Plan</h1>
                        <img className="form-image" src="https://media4.giphy.com/media/g37mGHexrv5ug/giphy.gif?cid=ecf05e47rx2e0lxjlaxhqst16u7d9oklksn4557odwgj1yd9&rid=giphy.gif&ct=g" />
                        <div className="text-and-form">
                            <div className="workoutplan-form">
                                <p className="workoutplan-text">Plan Name:</p>
                                <input
                                    type="text"
                                    value={newForm.collectionName}
                                    name="collectionName"
                                    placeholder="workout plan name"
                                    onChange={handleChange}
                                    className="input-form"
                                />
                            </div>
                            <div className="workoutplan-form">
                                <p className="workoutplan-text">Description: </p>
                                <input
                                    type="text"
                                    value={newForm.description}
                                    name="description"
                                    placeholder="description"
                                    onChange={handleChange}
                                    className="input-form"
                                />
                            </div>
                        </div>
                        <input
                            type="submit"
                            value="Create"
                            className="input-button"
                        />
                    </div>
                </form>
            </Modal>
            <div className="workoutplan-title-button">
                <h1 className="workoutplan-title">Workout Plans</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" type="submit"
                        value="+"
                        onClick={() => {
                            handleShow()
                        }} />
                </svg>
            </div>
            {collection ? loaded() : loading()
            }
        </div>
    )
}

export default WorkoutPlan;
