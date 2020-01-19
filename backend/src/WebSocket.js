const socketio = require('socket.io');

const transformStringArray = require('./utils/trasnfomrStringArray');
const CalcDistance = require('./utils/CalcDistance');


const connections = [];
let io;
exports.WebSocket = (server)=>{  
    io = socketio(server);

    io.on('connection', socket =>{
        const {latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: transformStringArray(techs),
        });   
    });
};

exports.filterCoonnections = (coordinates, techs)=> {
    return connections.filter(connection =>{
        return CalcDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item));
    })
};

exports.CommitMessenge = (to, messenge, data)=>{
    to.forEach(connection =>{
        io.to(connection.id).emit(messenge,data);
    })
}