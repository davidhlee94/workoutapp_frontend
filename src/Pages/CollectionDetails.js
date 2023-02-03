import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { Modal } from "react-bootstrap";
import "./CollectionDetails.css"

const CollectionDetails = () => {
    // **CONSTANTS**
    const { id } = useParams();
    const [newForm, setNewForm] = useState({
        name: "",
        reps: "",
        sets: "",
        weight: "",
        notes: ""
    });
    const [collection, setCollection] = useState([])
    const [show, setShow] = useState(false);
    const CollectionURL = `https://workoutapp-backend.herokuapp.com/collection/${id}`

    // **HANDLE SHOW AND CLOSE FOR THE MODALS**
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const getCollectionData = async () => {
        try {
            const response = await fetch(CollectionURL);
            const collectionData = await response.json();
            setCollection(collectionData);
        } catch (error) {
            console.log(error);
        }
    }

    // **FUNCTION TO CREATE EXERCISES - PUT WORKOUT COLLECTIONS**
    async function createExercise(exerciseData) {
        try {
            await fetch(`https://workoutapp-backend.herokuapp.com/collection/${id}/add-exercise`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(exerciseData),
            });
            getCollectionData();
        } catch (error) {
            console.log(error)
        }
    }

    // **FUNCTION TO DELETE EXERCISES - DELETE EXERCISES FROM WORKOUT COLLECTIONS**
    const deleteExercise = async (id) => {
        try {
            const options = {
                method: "DELETE"
            };
            const response = await fetch(`https://workoutapp-backend.herokuapp.com/exercise/${id}`, options);
            const deletedExercise = await response.json();
            getCollectionData()
        } catch (error) {
            console.log(error)
        }
    }

    // **HANDLECHANGE THAT FILLS NEW FORM WITH INFO**
    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value });
    };

    // **SUBMITTING INFO INTO NEW FORM**
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentState = { ...newForm };
        createExercise(currentState);
        setNewForm({ name: "", reps: "", sets: "", weight: "", notes: "" });
        handleClose();
    };

    // **USEEFFECT THAT RUNS GETCOLLECTIONSDATA**
    useEffect(() => {
        getCollectionData();
    }, []);

    return (
        <div className="collection-details-container">
            <h1 className="collection-title">{collection.collectionName}</h1>
            <h1 className="collection-description">{collection.description}</h1>
            {collection.exercises ? (
                collection.exercises.filter(exercise => exercise).map(exercise => (
                    <div key={exercise._id} className="exercise-container">
                        <div className="exercise-name-button">
                            <h1 className="exercise-name">{exercise.name}</h1>
                            <button className="button" onClick={() => {
                                deleteExercise(exercise._id)
                            }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>
                            </button>
                        </div>
                        <div className="exercise-info">
                            <div className="exercise-info-row">
                                <p className="exercise-info-text exercise-info-text-title">Sets:</p>
                                <p className="exercise-info-text">{exercise.sets}</p>
                            </div>
                            <div className="exercise-info-row">
                                <p className="exercise-info-text exercise-info-text-title">Reps:</p>
                                <p className="exercise-info-text">{exercise.reps}</p>
                            </div>
                            <div className="exercise-info-row">
                                <p className="exercise-info-text exercise-info-text-title">Weight:</p>
                                <p className="exercise-info-text">{exercise.weight} lbs</p>
                            </div>
                        </div>
                        <div className="notes-container">
                            <p className="notes">{exercise.notes}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading exercises...</p>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle-fill add-exercise" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" type="submit"
                    value="Add an exercise"
                    onClick={() => {
                        handleShow()
                    }}
                />
            </svg>
            <Modal show={show} onHide={handleClose} className="exercise-modal">
                <form onSubmit={handleSubmit} className="exercise-form">
                    <h1 className="exercise-form-title">Add an Exercise</h1>
                    <img className="exercise-form-image" src="https://thumbs.gfycat.com/ColdEarnestIndianpangolin.webp" />
                    <div className="exercise-text-and-form">
                        <div className="exercise-input-form">
                            <p className="exercise-text">Name:</p>
                            <input
                                className="input"
                                type="text"
                                value={newForm.name}
                                name="name"
                                placeholder="exercise name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="exercise-input-form">
                            <p className="exercise-text">Sets: </p>
                            <input
                                className="input"
                                type="text"
                                value={newForm.sets}
                                name="sets"
                                placeholder="number of sets"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="exercise-input-form">
                            <p className="exercise-text">Reps:</p>
                            <input
                                className="input"
                                type="text"
                                value={newForm.reps}
                                name="reps"
                                placeholder="numbers of reps"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="exercise-input-form">
                            <p className="exercise-text">Weight:</p>
                            <input
                                className="input"
                                type="text"
                                value={newForm.weight}
                                name="weight"
                                placeholder="weight in lbs"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="exercise-input-form">
                            <p className="exercise-text">Notes:</p>
                            <input
                                className="input"
                                type="text"
                                value={newForm.notes}
                                name="notes"
                                placeholder="notes"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Create exercise"
                        className="exercise-input-button"
                    />
                </form>
            </Modal>
        </div>
    );

}

export default CollectionDetails;
