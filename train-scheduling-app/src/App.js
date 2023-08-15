import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TrainList from "./TrainList";
import TrainDetails from "./TrainDetails";
import { registerCompany, getAccessToken } from "./api";

function App() {
  const [accessToken, setAccessToken] = useState("");

  const handleRegister = async () => {
    const companyData = {
      companyName: "Train Central",
      ownerName: "Ram",
      rollNo: "1",
      ownerEmail: "ram@abc.edu",
      accessCode: "FKDLjg",
    };

    try {
      await registerCompany(companyData);
      const authData = {
        companyName: "Train Central",
        clientID: "b46128a0-fbde-4c16-a4b1-6ae6ad718e27",
        ownerName: "Ram",
        ownerEmail: "ram@abc.edu",
        rollNo: "1",
        clientSecret: "XOyolORPayKBODAN",
      };
      const token = await getAccessToken(authData);
      setAccessToken(token);
    } catch (error) {
      console.error("Error registering or getting access token:", error);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <button onClick={handleRegister}>Register Company</button>

        <Switch>
          <Route path="/" exact>
            <TrainList accessToken={accessToken} />
          </Route>
          <Route path="/trains/:trainNumber">
            <TrainDetails accessToken={accessToken} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
