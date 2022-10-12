import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import "./App.css";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import Main from "./components/Main";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const RequireAuth = ({ children }) => {
    if (!user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  });
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      {/* <Route path="/tasks" element={<Protected Component={Main} />} /> */}

      <Route
        exact
        path="/tasks"
        element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
