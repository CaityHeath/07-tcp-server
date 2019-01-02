'use strict';

const events = require('../lib/events.js');
const socketPool = require('../lib/socketPool.js');

events.on('@nick', changeNickname);

function changeNickname(data, userId){
  socketPool[userId].nickname = data.target;
}

module.exports = changeNickname;