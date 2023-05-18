import { BrowserRouter , Routes , Route} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import ProfilePage from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
