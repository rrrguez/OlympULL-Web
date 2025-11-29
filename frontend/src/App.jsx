import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import OlympiadsPage from "./pages/OlympiadsPage";
import ItinerariesPage from "./pages/ItinerariesPage";
import ExercisesPage from "./pages/ExercisesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/olympiads" element={<OlympiadsPage />} />
        <Route path="/itineraries" element={<ItinerariesPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

