import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProblemSet from './Components/ProblemSet';
import LeaderBoard from './Components/LeaderBoard';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import ShowProblem from './Components/ShowProblem/ShowProblem';
import AddProblem from './Components/AddProblem';
import axios from 'axios';
import { useEffect, useState, createContext } from "react";
import Cookies from 'js-cookie';

const UserContext = createContext();

function App() {

  const [token, setToken] = useState(Cookies.get('token'));
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    (
      async () => {
        //const USER_URL = "https://code-geass-b1p5.onrender.com/api/user";
        const USER_URL = "https://code-geass-backend.onrender.com/api/user";
        const res = await axios.get(USER_URL, { headers: { Authorization: token } });
        if (res.status === 200) {
          setUser(res.data);
          setIsLoggedIn(true);
        }
        else {
          setIsLoggedIn(false);
        }
      }
    )();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, setToken, isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProblemSet />} />
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/login" element={isLoggedIn ? <ProblemSet /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/problem/:problemSlug" element={<ShowProblem />} />
          <Route path='/admin/add-problem' element={<AddProblem />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}  

export default App;
export { UserContext }