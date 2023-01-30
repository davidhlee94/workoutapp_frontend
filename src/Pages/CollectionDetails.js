import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { Modal } from "react-bootstrap";

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
        window.location.reload()
    }
    const handleShow = () => setShow(true);
    const [exercises, setExercises] = useState(null)
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

    const getExercises = async () => {
        const exercisesArray = [];
        const promises = collection["exercises"].map(async (_id) => {
            try {
                const response = await fetch(`http://localhost:4000/exercise/${_id}`);
                const data = await response.json();
                exercisesArray.push(data);
            } catch (error) {
                console.log(error)
            }
        });
        await Promise.all(promises);
        setExercises(exercisesArray);
    };


    async function createExercise(exerciseData) {
        try {
            await fetch(`http://localhost:4000/collection/${id}/add-exercise`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(exerciseData),
            });
            getExercises();
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
            window.location.reload()
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

    useEffect(() => {
        if (collection.exercises) {
            getExercises();
        }
    }, [collection]);

    return (
        <>
            <h1>{collection.collectionName}</h1>
            <h1>{collection.description}</h1>
            {exercises ? (
                exercises.filter(exercise => exercise).map(exercise => (
                    <div key={exercise._id}>
                        <p>{exercise.name}</p>
                        <p>{exercise.sets} sets</p>
                        <p>{exercise.reps} reps</p>
                        <p>{exercise.weight} lbs</p>
                    </div>
                ))
            ) : (
                <p>Loading exercises...</p>
            )}
            <input
                type="submit"
                value="Add an exercise"
                onClick={() => {
                    handleShow()
                }}
            />
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <p>Exercise Name:</p>
                    <input
                        type="text"
                        value={newForm.name}
                        name="name"
                        placeholder="exercise name"
                        onChange={handleChange}
                    />
                    <p>Sets: </p>
                    <input
                        type="text"
                        value={newForm.sets}
                        name="sets"
                        placeholder="number of sets"
                        onChange={handleChange}
                    />
                    <p>Reps:</p>
                    <input
                        type="text"
                        value={newForm.reps}
                        name="reps"
                        placeholder="numbers of reps"
                        onChange={handleChange}
                    />
                    <p>Weight:</p>
                    <input
                        type="text"
                        value={newForm.weight}
                        name="weight"
                        placeholder="weight in lbs"
                        onChange={handleChange}
                    />
                    <input
                        type="submit"
                        value="Create exercise"
                    />
                </form>
            </Modal>
        </>
    );

}

export default CollectionDetails;
