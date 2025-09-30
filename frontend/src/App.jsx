import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Learningpage from "./pages/Learningpage";
import Quizpage from "./pages/Quizpage";

import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/learn" element={<Learningpage />} />
        <Route path="/quiz" element={<Quizpage />} />
      </Routes>
    </div>
  );
}
export default App;
