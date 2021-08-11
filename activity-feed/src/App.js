import logo from "./logo.svg";
import "./App.css";
import { StreamApp, StatusUpdateForm, FlatFeed } from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4001/token");
      const data = await response.json();
      const userToken = data.userToken;
      setToken(userToken);
    })();
  }, []);
  return token ? (
    <StreamApp apiKey="xmze4hbhjfuc" appId="1137426" token={token}>
      <StatusUpdateForm />
      <FlatFeed feedGroup="user" notify />
    </StreamApp>
  ) : null;
}

export default App;
