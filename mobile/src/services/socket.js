import socketio from 'socket.io-client';


const socket = socketio('http://192.168.0.103:3333',{
    autoConnect: false,
});

function subscribeToNewDev(subscribeFunction){
    socket.on('NewDev', subscribeFunction);
}

function connect(latitude, longitude, techs ){
    socket.io.opts.query = {
        latitude, 
        longitude, 
        techs,
    };
    socket.connect();
}

function desconnect(){
    if(socket.connected){
        socket.desconnect();
    }
}

export {
    connect,
    desconnect,
    subscribeToNewDev,
};