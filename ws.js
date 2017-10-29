/* globals WS_BACKEND_PATH, WS_BACKEND_URL */

import Socketio from "socket.io-client";

const socketio = Socketio(WS_BACKEND_URL, {
  path: WS_BACKEND_PATH
});

let authorizationTokens;

function sendAuthorization () {
  if (!authorizationTokens) {
    return;
  }
  socketio.emit("authorization", authorizationTokens);
}

function authorize(tokens) {
  authorizationTokens = tokens;
  sendAuthorization();
}

socketio.on("connect", () => {
  sendAuthorization();
});

// socketio.on("reconnect", (attemptNo) => console.log("reconnect", attemptNo));
// socketio.on("disconnect", (...args) => console.log("disconnect", ...args));
// socketio.on("error", () => console.log("error", arguments));

export default {
  emit: socketio.emit.bind(socketio),
  on: socketio.on.bind(socketio),
  authorize
};
