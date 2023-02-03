import './App.css';
import Header from './Components/Header';
import WorkoutPlan from './Pages/WorkoutPlan';
import Home from './Pages/Home';
import { Route, Routes } from "react-router-dom";
import CollectionDetails from './Pages/CollectionDetails';
import MuscleGroups from './Pages/MuscleGroups';
import Abs from './Pages/muscles/Abs';
import Back from './Pages/muscles/Back';
import Biceps from './Pages/muscles/Biceps';
import Calves from './Pages/muscles/Calves';
import Chest from './Pages/muscles/Chest';
import Forearms from './Pages/muscles/Forearms';
import Glutes from './Pages/muscles/Glutes';
import Ham from './Pages/muscles/Ham';
import Quad from './Pages/muscles/Quad';
import Shoulders from './Pages/muscles/Shoulders';
import Triceps from './Pages/muscles/Triceps';
import { UserContext } from './data';
import { useEffect, useState } from 'react';
import Auth from './Pages/Auth';

// console.log(UserContext)
function App() {
  const { Provider: UserInfo } = UserContext

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState({})


  return (
    <div className="app-container">
      <UserInfo value={{
        isAuthenticated,
        setAuth: setIsAuthenticated,
        user: currentUser,
        setUser:
          setCurrentUser

      }}
      >
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/workoutplan" element={<WorkoutPlan />} />
            <Route path="/collection/:id" element={<CollectionDetails />} />
            <Route path="/musclegroups" element={<MuscleGroups />} />
            <Route path="/musclegroups/Abdominals" element={<Abs />} />
            <Route path="/musclegroups/back" element={<Back />} />
            <Route path="/musclegroups/biceps" element={<Biceps />} />
            <Route path="/musclegroups/calves" element={<Calves />} />
            <Route path="/musclegroups/chest" element={<Chest />} />
            <Route path="/musclegroups/forearms" element={<Forearms />} />
            <Route path="/musclegroups/glutes" element={<Glutes />} />
            <Route path="/musclegroups/hamstrings" element={<Ham />} />
            <Route path="/musclegroups/quadriceps" element={<Quad />} />
            <Route path="/musclegroups/shoulders" element={<Shoulders />} />
            <Route path="/musclegroups/triceps" element={<Triceps />} />
          </Routes>
        </div>
      </UserInfo>
    </div>
  );
}

export default App;
