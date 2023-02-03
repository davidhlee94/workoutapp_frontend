import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { Modal } from "react-bootstrap";
import "./CollectionDetails.css"

const CollectionDetails = () => {
    const { id } = useParams();
    const [newForm, setNewForm] = useState({
        name: "",
        reps: "",
        sets: "",
        weight: "",
    });
    const [collection, setCollection] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // getExercises()
    }
    const handleShow = () => setShow(true);
    // const [exercises, setExercises] = useState(null)
    const CollectionURL = `http://localhost:4000/collection/${id}`

    const getCollectionData = async () => {
        try {
            const response = await fetch(CollectionURL);
            const collectionData = await response.json();
            setCollection(collectionData);
        } catch (error) {
            console.log(error);
        }
    }

    // const getExercises = async () => {
    //     const exercisesArray = [];
    //     const promises = collection["exercises"].map(async (_id) => {
    //         try {
    //             const response = await fetch(`http://localhost:4000/exercise/${_id}`);
    //             const data = await response.json();
    //             console.log(data)
    //             exercisesArray.push(data);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     });
    //     await Promise.all(promises);
    //     setExercises(exercisesArray);
    // };


    async function createExercise(exerciseData) {
        try {
            await fetch(`http://localhost:4000/collection/${id}/add-exercise`, {
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

    const deleteExercise = async (id) => {
        try {
            const options = {
                method: "DELETE"
            };
            const response = await fetch(`http://localhost:4000/exercise/${id}`, options);
            const deletedExercise = await response.json();
            getCollectionData()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentState = { ...newForm };
        createExercise(currentState);
        setNewForm({ name: "", reps: "", sets: "", weight: "" });
        handleClose();
    };


    useEffect(() => {
        getCollectionData();
    }, []);

    // useEffect(() => {
    //     if (collection.exercises) {
    //         // getExercises();
    //     }
    // }, [collection]);

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
                            <p className="exercise-info-text">Sets: {exercise.sets}</p>
                            <p className="exercise-info-text">Reps: {exercise.reps}</p>
                            <p className="exercise-info-text">Weight: {exercise.weight} lbs</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading exercises...</p>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
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
                                type="text"
                                value={newForm.weight}
                                name="weight"
                                placeholder="weight in lbs"
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
