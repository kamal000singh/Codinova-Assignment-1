import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/:id" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
