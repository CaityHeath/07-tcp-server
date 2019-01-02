'use strict';

// First Party Modules
const net = require('net');

// Third Party Modules
const uuid = require('uuid/v4');

const port = process.env.PORT || 3001;
const server = net.createServer();

const actions = require('require-directory')(module, './actions');


//esoteric libraries
const events = require('./lib/events.js');
const socketPool = require('./lib/socketPool.js');


//CLIENT MODEL ---> User constructor
function User(socket){
  let id = uuid();
  this.id = id;
  this.nickname = `User-${id}`;
  this.socket = socket;
}

//Socket Pool Module

server.on('connection', (socket) => {

  let user = new User(socket);
  //let id = uuid();
  socketPool[user.id] = user;
  socket.on('data', (buffer) => dispatchAction(user.id, buffer));
});

///////////Could be a module!!///////////////////
let parse = (buffer) => {
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  return {command,payload,target,message};
};

/////////////////////////////////////////////////////



let dispatchAction = (userId, buffer) => {
  let entry = parse(buffer);
  console.log(entry.command, entry, userId);
  events.emit(entry.command, entry, userId);
};


server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});
