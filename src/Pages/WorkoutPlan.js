import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./WorkoutPlan.css"
import { getUserToken } from "../utils/authToken";
import { UserContext } from "../data";

const WorkoutPlan = () => {

    // **CONSTANTS**
    const URL = "https://workoutapp-backend.herokuapp.com/collection";
    const [collection, setCollection] = useState([]);
    const [show, setShow] = useState(false);
    const token = getUserToken()
    const currentUser = useContext(UserContext)
    const currentUserID = currentUser.user._id

    // **HANDLE SHOW AND CLOSE FOR THE MODALS**
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [newForm, setNewForm] = useState({
        collectionName: "",
        description: "",
        exercises: []
    });

    // **FUNCTION FETCHING ALL WORKOUT COLLECTIONS**
    const getCollections = async () => {
        try {
            const response = await fetch(URL);
            const allCollections = await response.json()
            console.log(allCollections)
            const userCollections = allCollections.filter((collection) => collection.owner === currentUserID)
            setCollection(userCollections)
        } catch (error) {
            console.log(error);
        }
    }

    // **FUNCTION TO CREATE A WORKOUT PLAN - POST TO DATEBASE**
    const createWorkoutPlan = async (workoutData) => {
        try {
            await fetch(`https://workoutapp-backend.herokuapp.com/collection`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(workoutData),
            });
            getCollections();
        } catch (error) {
            console.log(error)
        }
    }

    // **FUNCTION TO DELETE A WORKOUT PLAN - DELETE FROM DATEBASE**
    const deleteWorkoutPlan = async (id) => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await fetch(`https://workoutapp-backend.herokuapp.com/collection/${id}`, options);
            const deletedWorkout = await response.json();
            getCollections();
        } catch (error) {
            console.log(error)
        }
    };


    // **FUNCTION TO MAP THROUGH WORKOUT COLLECTIONS AND DISPLAY**
    const loaded = () => {
        return collection.map((collections) => (
            <div key={collections._id} className="workout-container">
                <Link to={`/collection/${collections._id}`} className="workout-link">
                    <h2 className="collection-name">{collections.collectionName}</h2>
                </Link>
                <button className="button" onClick={() => deleteWorkoutPlan(collections._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </button>
            </div>
        ))
    }

    const loading = () => {
        <div>Loading your gains...</div>;
    }


    // **HANDLECHANGE THAT FILLS NEW FORM WITH INFO**
    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value });
    };

    // **SUBMITTING INFO INTO NEW FORM**
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


    // **USEEFFECT THAT RUNS GETCOLLECTIONS, THAT TRACKS THE STATE OF SHOW**
    useEffect(() => {
        getCollections();
    }, [show]);

    return (
        <div className="workoutplans-container">
            <Modal show={show} onHide={handleClose} className="modal">
                <form onSubmit={handleSubmit} className="form" >
                    <div className="form-content">
                        <h1 className="form-title">Create a Workout Plan</h1>
                        <img className="form-image" src="https://media4.giphy.com/media/g37mGHexrv5ug/giphy.gif?cid=ecf05e47rx2e0lxjlaxhqst16u7d9oklksn4557odwgj1yd9&rid=giphy.gif&ct=g" />
                        {currentUserID && <><div className="text-and-form">
                            <div className="workoutplan-form">
                                <p className="workoutplan-text">Plan Name:</p>
                                <input
                                    type="text"
                                    value={newForm.collectionName}
                                    name="collectionName"
                                    placeholder="workout plan name"
                                    onChange={handleChange}
                                    className="input"
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
                                    className="input"
                                />
                            </div>
                        </div>
                            <input
                                type="submit"
                                value="Create"
                                className="input-button"
                            /></>}
                    </div>
                </form>
            </Modal>
            <div className="workoutplan-title-button">
                <h1 className="workoutplan-title">Workout Plans</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" type="submit"
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
