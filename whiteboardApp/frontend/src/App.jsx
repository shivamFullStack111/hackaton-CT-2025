import { Excalidraw } from "@excalidraw/excalidraw";
import { io } from "socket.io-client";
import '../node_modules/@excalidraw/excalidraw/dist/dev/index.css'
import { useEffect } from "react";


const socket = io("http://localhost:8788");


const App = () => {
  useEffect(() => {
    socket.on('connect', () => {socket.id });
    return()=>{
      socket.off("connect")
    }
  }, [])
  

  return (
    <div style={{ width: 500, height: 300 }}>
      <Excalidraw />
    </div>
  );
};

export default App;
