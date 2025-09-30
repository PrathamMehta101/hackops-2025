import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Learningpage from "./pages/Learningpage";
import Quizpage from "./pages/Quizpage";
import Wheelpage from "./pages/Wheelpage";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/learn" element={<Learningpage />} />
        <Route path="/quiz" element={<Quizpage />} />
        <Route path="/wheel" element={<Wheelpage />} />
      </Routes>
    </div>
  );
}
export default App;
