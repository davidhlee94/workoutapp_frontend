import './App.css';
import Header from './Components/Header';
import WorkoutPlan from './Pages/WorkoutPlan';
import Home from './Pages/Home';
import { Route, Routes } from "react-router-dom";
import CollectionDetails from './Pages/CollectionDetails';
import MuscleGroups from './Pages/MuscleGroups';
import { UserContext } from './data';
import { useState } from 'react';
import Auth from './Pages/Auth';
import AllMuscles from './Pages/muscles/AllMuscles';
import About from './Pages/About';

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
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/workoutplan" element={<WorkoutPlan />} />
            <Route path="/collection/:id" element={<CollectionDetails />} />
            <Route path="/musclegroups" element={<MuscleGroups />} />
            <Route path="/musclegroups/:name" element={<AllMuscles />} />
          </Routes>
        </div>
      </UserInfo>
    </div>
  );
}

export default App;
