import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function subscribeTimer(cb) {
    socket.on('timer', timestamp => cb(timestamp));
    socket.emit('subscribeTimer', 1000);
}

function msgReciever(cb) {
    socket.on("recieved", (msg) => cb(msg));
}

function msgSender(message) {
    socket.emit("newMsg", message);
}

function setUserIsTyping(cb) {
    socket.on('user-is-typing', (response) => cb(response));
}

function setUserName(name,msg) {
    socket.emit('user-name', name,msg);
}

export {
    subscribeTimer,
    msgReciever,
    msgSender,
    setUserIsTyping,
    setUserName,
};