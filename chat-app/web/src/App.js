import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { GlobalContext } from "./state/GlobalContext";
function App() {
  const { setSocket } = useContext(GlobalContext);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socket.on("connect", () => {
      console.log("you connected with id : " + socket.id);
    });
    setSocket(socket);
  }, [setSocket]);
  return (
    <div className="App">
      <h1>heading</h1>
    </div>
  );
}

export default App;
