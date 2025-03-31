import { createContext, useContext, useEffect, useState } from "react";
import { Io } from "../socket";
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // connect to socket
    Io.connect();
    // define inside to get the lastet state value
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    Io.on("connect", handleConnect);
    Io.on("disconnect", handleDisconnect);

    // perform cleanup
    return () => {
      //   Io.off("connect", handleConnect);
      //   Io.off("disconnect", handleDisconnect);
      //   Io.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket: Io, setIsConnected, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
