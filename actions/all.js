'use strict';

const events =  require('../lib/events.js');
const socketPool = require('../lib/socketPool.js');

events.on('@all', sendToAll);

function sendToAll(data, userId){
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
}

module.exports = sendToAll;
