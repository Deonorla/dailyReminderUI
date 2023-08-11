import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SideBar from "./Components/SideBar";
import Dashboard from "./Pages/Dashboard";
import SignupPage from "./Pages/Signup";
import Signup from "./Pages/Signup";
import { useCookies } from "react-cookie";

interface Todo {
  id: string;
  user_email: string;
  day_name: string;
  day_date: string;
  plans: Plan[]; // Update the type to Plan[]
}

interface Plan {
  title: string;
  progress: number;
  describ: string;
  remind: string;
}

function App() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const authToken = cookie.AuthToken;
  const userEmail = cookie.Email;
  const [tasks, setTasks] = useState<Todo[]>([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const data: Todo[] = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Sort by date
  const sortedTask = Array.isArray(tasks)
    ? tasks.sort(
        (a: Todo, b: Todo) =>
          new Date(a.day_date).getTime() - new Date(b.day_date).getTime()
      )
    : [];

  if (authToken) {
    return (
      <Router>
        <div>
          <Header />
          <div className="flex flex-row">
            {/* <SideBar /> */}
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard sortedTask={sortedTask} getData={getData} />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  } else {
    return <Signup />;
  }
}

export default App;
