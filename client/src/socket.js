import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5500";

class Socket {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("Connected socketId:", this.socket.id);
      });

      this.socket.on("disconnect", () => {
        console.log(" Disconnected from socket");
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

export const Io = new Socket();
