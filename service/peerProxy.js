const { WebSocketServer, WebSocket } = require('ws');

let socketServer

function peerProxy(httpServer) {
    // creates server instance
    socketServer = new WebSocketServer({ server: httpServer });

    // when there's a connection, set status to alive and PONGGGGG
    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    // lil recurring function that helps us save memory when connections aren't alive anymore
    setInterval(() => {
            socketServer.clients.forEach((client) => {
                if (!client.isAlive) return client.terminate();
                client.isAlive = false;
                client.ping();
            });
        }, 10000
    );
}

// updates everyone's article count when a change occurs in DB
function broadcast(data) {
    if (!socketServer) return;

    socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = { peerProxy, broadcast };