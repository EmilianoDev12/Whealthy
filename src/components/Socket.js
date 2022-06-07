import io from 'socket.io-client';

let socket = io('https://whealthy-rest.herokuapp.com');

export default socket;